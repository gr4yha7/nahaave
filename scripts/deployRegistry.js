const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const LendingPoolAddressesProviderRegistry = await hre.ethers.getContractFactory("contracts/protocol/configuration/LendingPoolAddressesProviderRegistry.sol:LendingPoolAddressesProviderRegistry");
  const registryProvider = await LendingPoolAddressesProviderRegistry.deploy();

  await registryProvider.deployed();

  console.log("LendingPoolAddressesProviderRegistry deployed to:", registryProvider.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
