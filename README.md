// Generate the files:

// Generate the .did files
npm run generate:did
dfx start --clean
dfx deploy 

npm run dev
