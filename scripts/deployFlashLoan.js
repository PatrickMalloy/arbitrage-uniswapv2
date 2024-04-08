const hre = require("hardhat");

async function main() {
  const FlashLoan = await hre.ethers.getContractFactory("FlashLoan");
  // const PoolAddressesProvider-Polygon = "0x4CeDCB57Af02293231BAA9D39354D6BFDFD251e0";
  const flashLoan = await hre.ethers.deployContract("FlashLoan", ["0x4CeDCB57Af02293231BAA9D39354D6BFDFD251e0"]);

  await flashLoan.waitForDeployment();
  console.log("FlashLoan contract deployed: ", flashLoan.target);
  // FlashLoan contract deployed on Polygon Mumbai:  0xB71AFC6a867a63E1E68289ADCDEC245E5C5d68A0
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
