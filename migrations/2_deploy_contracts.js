var ITellor = artifacts.require("./ITellor.sol");

module.exports = function(deployer, network) {

  if(network == "mainnet") {

  } else {
    deployer.deploy(ITellor);
  }

};
