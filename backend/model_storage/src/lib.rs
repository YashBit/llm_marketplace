use candid::{CandidType, Deserialize};
use ic_cdk_macros::*;
use ic_stable_memory::collections::SVec;
use ic_stable_memory::derive::{CandidAsDynSizeBytes, StableType};
use ic_stable_memory::{stable_memory_init, SBox};
use std::cell::RefCell;
use candid::candid_method;


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

#[candid_method(init)]
#[ic_cdk_macros::init]
fn init() {
    stable_memory_init();
    MODEL_STORAGE.with(|storage| {
        *storage.borrow_mut() = Some(SVec::new());
    });
}

#[candid_method(update)]
#[ic_cdk_macros::update]
pub fn store_model(name: String, weights: Vec<u8>, config: String) -> Result<(), String> {
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

#[candid_method(query)]
#[ic_cdk_macros::query]
pub fn get_model_names() -> Vec<String> {
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

#[candid_method(query)]
#[ic_cdk_macros::query]
pub fn get_model_config(name: String) -> Result<String, String> {
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

#[candid_method(update)]
#[ic_cdk_macros::update]
pub fn get_model_weights(name: String) -> Result<Vec<u8>, String> {
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

#[candid_method(update)]
#[ic_cdk_macros::update]
pub fn delete_model(name: String) -> Result<(), String> {
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

// Manually define Candid service
candid::export_service!{
    init;
    store_model: (String, Vec<u8>, String) -> (Result<(), String>);
    get_model_names: () -> (Vec<String>) query;
    get_model_config: (String) -> (Result<String, String>) query;
    get_model_weights: (String) -> (Result<Vec<u8>, String>);
    delete_model: (String) -> (Result<(), String>);
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs::File;
    use std::io::Write;
    use std::path::PathBuf;

    #[test]
    fn generate_candid() {
        let did = __export_service();
        println!("Generated Candid interface:\n{}", did);
        
        let dir = PathBuf::from(".");
        let did_path = dir.join("model_storage.did");
        let mut file = File::create(did_path.clone()).expect("Unable to create .did file");
        file.write_all(did.as_bytes()).expect("Unable to write to .did file");
        println!("Candid interface written to {:?}", did_path);
        
        // Read and print the contents of the file
        let did_contents = std::fs::read_to_string(did_path).expect("Unable to read .did file");
        println!("Contents of model_storage.did:\n{}", did_contents);
    }
}