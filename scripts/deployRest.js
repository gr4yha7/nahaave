const {ethers} = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const lendingPoolAddressesProvider = "0x963672187397904ec0346dbBe444222f0144399e";
  const WETH = "0x4200000000000000000000000000000000000006";

  // const LendingPool = await ethers.getContractFactory("contracts/protocol/lendingpool/LendingPool.sol:LendingPool", {
  //   libraries: {
  //     ReserveLogic: "contracts/protocol/libraries/logic/ReserveLogic.sol:ReserveLogic",
  //     ValidationLogic: "contracts/protocol/libraries/logic/ValidationLogic.sol:ValidationLogic",
  //   }
  // });
  const AaveProtocolDataProvider = await ethers.getContractFactory("contracts/misc/AaveProtocolDataProvider.sol:AaveProtocolDataProvider");
  const WETHGateway = await ethers.getContractFactory("contracts/misc/WETHGateway.sol:WETHGateway");

  // const lendingPool = await LendingPool.deploy();
  const aaveProtocolDataProvider = await AaveProtocolDataProvider.deploy(lendingPoolAddressesProvider);
  const wethGateway = await WETHGateway.deploy(WETH);

  // await lendingPool.deployed();
  await aaveProtocolDataProvider.deployed();
  await wethGateway.deployed();

  // console.log("LendingPool deployed to:", lendingPool.address);
  console.log("AaveProtocolDataProvider deployed to:", aaveProtocolDataProvider.address);
  console.log("WETHGateway deployed to:", wethGateway.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
