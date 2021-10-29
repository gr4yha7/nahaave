const {ethers} = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const ReserveLogic = await ethers.getContractFactory("contracts/protocol/libraries/logic/ReserveLogic.sol:ReserveLogic");
  const GenericLogic = await ethers.getContractFactory("contracts/protocol/libraries/logic/GenericLogic.sol:GenericLogic");
  const genericLogic = await GenericLogic.deploy();
  await genericLogic.deployed();

  const ValidationLogic = await ethers.getContractFactory("contracts/protocol/libraries/logic/ValidationLogic.sol:ValidationLogic", {
    libraries: {
      "contracts/protocol/libraries/logic/GenericLogic.sol:GenericLogic": genericLogic.address,
    }
  });

  const reserveLogic = await ReserveLogic.deploy();
  await reserveLogic.deployed();

  const validationLogic = await ValidationLogic.deploy();
  await validationLogic.deployed();


  const LendingPool = await ethers.getContractFactory("contracts/protocol/lendingpool/LendingPool.sol:LendingPool", {
    libraries: {
      "contracts/protocol/libraries/logic/ReserveLogic.sol:ReserveLogic": reserveLogic.address,
      "contracts/protocol/libraries/logic/ValidationLogic.sol:ValidationLogic": validationLogic.address,
    }
  });

  const lendingPool = await LendingPool.deploy();

  await lendingPool.deployed();

  console.log("LendingPool deployed to:", lendingPool.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
