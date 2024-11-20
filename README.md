// Generate the files:

// Generate the .did files
npm run generate:did
dfx generate (bindings for js)
dfx start --clean
dfx deploy

npm run dev

// See the status of the canisters

dfx canister status CANISTER_NAME

// Add the correct principal id as the controller:

The principal changes.
dfx canister update-settings model_storage --add-controller b2vdk-tosio-iy34u-4kip4-aahs4-wrytj-s7skt-rtwdg-3a342-pub5b-nqe

dfx canister info model_storage
//

pkill -f dfx
