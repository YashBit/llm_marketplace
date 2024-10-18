use ic_cdk_macros::{post_upgrade, pre_upgrade, query, update};
use ic_stable_structures::{memory_manager::{MemoryId, MemoryManager, VirtualMemory}, DefaultMemoryImpl, StableBTreeMap};
use ic_stable_structures::storable::{Storable, Bound};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::borrow::Cow;
use candid::candid_method;
mod memory;
use memory::Memory;

type VMemory = VirtualMemory<DefaultMemoryImpl>;

#[derive(Serialize, Deserialize, Clone)]
struct ModelData {
    name: String,
    weights: Vec<u8>,
    config: String,
}

impl Storable for ModelData {
    const BOUND: Bound = Bound::Bounded {
        max_size: 1024, // Adjust based on your model's expected size
        is_fixed_size: false,
    };

    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(serde_cbor::to_vec(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        serde_cbor::from_slice(&bytes).unwrap()
    }
}

#[derive(Serialize, Deserialize)]
struct State {
    #[serde(skip, default = "init_stable_data")]
    model_data: StableBTreeMap<String, ModelData, VMemory>,
}

thread_local! {
    static STATE: RefCell<State> = RefCell::new(State::default());
}

fn init_stable_data() -> StableBTreeMap<String, ModelData, VMemory> {
    StableBTreeMap::init(crate::memory::get_stable_btree_memory())
}

impl Default for State {
    fn default() -> Self {
        Self {
            model_data: init_stable_data(),
        }
    }
}

#[update]
#[candid_method(update)]
fn store_model(name: String, weights: Vec<u8>, config: String) -> Result<(), String> {
    let model = ModelData { name: name.clone(), weights, config };
    STATE.with(|s| s.borrow_mut().model_data.insert(name, model));
    Ok(())
}

#[query]
#[candid_method(query)]
fn get_model_names() -> Vec<String> {
    STATE.with(|s| {
        s.borrow().model_data.iter()
            .map(|(key, _)| key.clone())
            .collect()
    })
}
#[query]
#[candid_method(query)]
fn get_model_config(name: String) -> Result<String, String> {
    STATE.with(|s| {
        match s.borrow().model_data.get(&name) {
            Some(model) => Ok(model.config.clone()),
            None => Err("Model not found".to_string()),
        }
    })
}

#[query]
#[candid_method(query)]
fn get_model_weights(name: String) -> Result<Vec<u8>, String> {
    STATE.with(|s| {
        match s.borrow().model_data.get(&name) {
            Some(model) => Ok(model.weights.clone()),
            None => Err("Model not found".to_string()),
        }
    })
}

#[update]
#[candid_method(update)]
fn delete_model(name: String) -> Result<(), String> {
    STATE.with(|s| {
        if s.borrow_mut().model_data.remove(&name).is_some() {
            Ok(())
        } else {
            Err("Model not found".to_string())
        }
    })
}



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
