const {ethers} = require("hardhat");
const metadata = require("../artifacts-ovm/contracts/protocol/configuration/LendingPoolAddressesProviderRegistry.sol/LendingPoolAddressesProviderRegistry.json");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const providerAddress = "0x963672187397904ec0346dbBe444222f0144399e";
  const registryAddress = "0x819c4CDA0C95e79df89C7596FC60327D1a3949CD";

  const LendingPoolAddressesProviderRegistry = await ethers.getContractAt(metadata.abi, registryAddress);

  const tx = await LendingPoolAddressesProviderRegistry.registerAddressesProvider(providerAddress, 1);
  if (tx) {
    console.log("Tx", tx)
    console.log("Provider registered");
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
