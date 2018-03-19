var HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      gas: 4690000,
      network_id: 4,
      gasPrice: 42000000000 // Specified in Wei
    }
  }
};
