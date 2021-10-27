const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const LendingPoolAddressesProvider = await hre.ethers.getContractFactory("contracts/protocol/configuration/LendingPoolAddressesProvider.sol:LendingPoolAddressesProvider");
  const lpaProvider = await LendingPoolAddressesProvider.deploy("Nahmii genesis market");

  await lpaProvider.deployed();

  console.log("LendingPoolAddressesProvider deployed to:", lpaProvider.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
