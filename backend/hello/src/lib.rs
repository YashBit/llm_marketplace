use candid::{CandidType, Deserialize};
use ic_cdk_macros::{init, query, update};
use ic_stable_memory::collections::SVec;
use ic_stable_memory::derive::{CandidAsDynSizeBytes, StableType};
use ic_stable_memory::{stable_memory_init, SBox};
use serde_json;
use std::cell::RefCell;

#[derive(CandidType, Deserialize, StableType, CandidAsDynSizeBytes, Clone, Debug)]
struct ModelData {
    name: String,
    weights: Vec<u8>,
    config: String,
}

type ModelStorage = SVec<SBox<ModelData>>;

thread_local! {
    static MODEL_STORAGE: RefCell<Option<ModelStorage>> = RefCell::default();
}

#[init]
fn init() {
    stable_memory_init();
    MODEL_STORAGE.with(|storage| {
        *storage.borrow_mut() = Some(SVec::new());
    });
}

#[update]
fn store_model(name: String, weights: Vec<u8>, config: String) -> Result<(), String> {
    let model_data = ModelData {
        name: name.clone(),
        weights,
        config,
    };

    MODEL_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        let storage = storage.as_mut().unwrap();

        // Check if a model with the same name already exists
        if storage.iter().any(|model| model.name == name) {
            return Err("A model with this name already exists".to_string());
        }

        let boxed_model = SBox::new(model_data).map_err(|e| format!("Failed to create SBox: {:?}", e))?;
        storage.push(boxed_model).map_err(|e| format!("Failed to store model: {:?}", e))?;
        Ok(())
    })
}

#[query]
fn get_model_names() -> Vec<String> {
    MODEL_STORAGE.with(|storage| {
        storage
            .borrow()
            .as_ref()
            .unwrap()
            .iter()
            .map(|model| model.name.clone())
            .collect()
    })
}

#[query]
fn get_model_config(name: String) -> Result<String, String> {
    MODEL_STORAGE.with(|storage| {
        storage
            .borrow()
            .as_ref()
            .unwrap()
            .iter()
            .find(|model| model.name == name)
            .map(|model| model.config.clone())
            .ok_or_else(|| "Model not found".to_string())
    })
}

#[update]
fn get_model_weights(name: String) -> Result<Vec<u8>, String> {
    MODEL_STORAGE.with(|storage| {
        storage
            .borrow()
            .as_ref()
            .unwrap()
            .iter()
            .find(|model| model.name == name)
            .map(|model| model.weights.clone())
            .ok_or_else(|| "Model not found".to_string())
    })
}

#[update]
fn delete_model(name: String) -> Result<(), String> {
    MODEL_STORAGE.with(|storage| {
        let mut storage = storage.borrow_mut();
        let storage = storage.as_mut().unwrap();

        let index = storage
            .iter()
            .position(|model| model.name == name)
            .ok_or_else(|| "Model not found".to_string())?;

        storage.remove(index);
        Ok(())
    })
}

// Candid interface definition
ic_cdk::export_candid!();