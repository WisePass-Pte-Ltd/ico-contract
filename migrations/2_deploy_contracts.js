const PassCoin = artifacts.require('PassCoin');
const PassContributorWhitelist = artifacts.require('PassContributorWhitelist');
const PassTokenSale = artifacts.require('PassTokenSale');

module.exports = function(deployer) {
  var fundingStartTime = 1520920736;
  var fundingPreEndTime = 1521093536;
  var fundingSale1EndTime = 1521266336;
  var fundingSale2EndTime = 1521439136;
  var fundingEndTime = 1521611936;

  // Multisigwallet: Ethereum Wallet / Mist 
  var EthereumMultisigWalletAddress = '0xbb044e8A2237d2f4c201620430cccB167a40BA99';

deployer.deploy(
      PassCoin,
      EthereumMultisigWalletAddress
    ).then(() => {
      return deployer.deploy(PassContributorWhitelist);
    }).then(() => {
      return deployer.deploy(
        PassTokenSale,
        PassCoin.address,
        PassContributorWhitelist.address,
        EthereumMultisigWalletAddress,
        EthereumMultisigWalletAddress,
        fundingStartTime,
        fundingPreEndTime,
        fundingSale1EndTime,
        fundingSale2EndTime,
        fundingEndTime
      ).then(() => {
        return PassCoin.deployed().then(function(instance) {
          return instance.setTokenSaleAddress(PassTokenSale.address);
        });
      });
  }).catch(e => console.log(e));
};
