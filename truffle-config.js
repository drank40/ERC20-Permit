const mnemonic = "earth knife foot clinic embrace upset market ensure crack sustain right globe"
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {

  networks: {

    test: {
        provider: function() {
          return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/");
        },
        network_id: '*',
    },
  },

  mocha: {
    useColors: true
  },

  compilers: {
    solc: {
      version: "0.8.10",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
    }
  },
};
