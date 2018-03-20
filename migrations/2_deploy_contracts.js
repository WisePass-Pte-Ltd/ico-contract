const PassCoin = artifacts.require('PassCoin');
const PassContributorWhitelist = artifacts.require('PassContributorWhitelist');
const PassTokenSale = artifacts.require('PassTokenSale');

module.exports = function(deployer) {

  // Please change to your ICO time
  var fundingStartTime = 1521939600; // UTC: Sunday 25th March 2018 01:00:00 AM
  var fundingPreEndTime = 1527209999; // UTC: Friday 25th May 2018 12:59:59 AM
  var fundingSale1EndTime = 1529888399; // UTC: Monday 25th June 2018 12:59:59 AM
  var fundingSale2EndTime = 1532393999; // UTC: Tuesday 24th July 2018 12:59:59 AM
  var fundingEndTime = 1532480399; // UTC: Wednesday 25th July 2018 12:59:59 AM

  // // Please change to your Multisigwallet: Ethereum Wallet / Mist address
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
