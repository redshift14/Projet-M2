require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`)
      },
      network_id: 3,
      gas: 4000000 
    },
    kovan: {
      provider : function() {
        return new HDWalletProvider(process.env.MNEMONIC, `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`, 0, 3)
      },
      network_id: 42, 
      gas: 400000,
      from: '0x2e012dbE50C1a02Ed35f91ceb07D6d455b99Bf78', 
      skipDryRun: true
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      parser: "solcjs",
      version: "^0.5.6",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}

// 0x916368c757Ea208E4B35f6CF337D744F4cab3268
// 0x916368c757Ea208E4B35f6CF337D744F4cab3268
// 0x916368c757Ea208E4B35f6CF337D744F4cab3268

// 2055840000000000
// 12000000000000000
// 2000003259504340

// 12000000000000000
// 4106356148760850

// 120000000.
// 12500000