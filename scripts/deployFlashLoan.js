const hre = require("hardhat");

async function main() {
  const FlashLoan = await hre.ethers.getContractFactory("FlashLoan");
  // const PoolAddressesProviderPolygonMumbai= "0x4CeDCB57Af02293231BAA9D39354D6BFDFD251e0";
  // const PoolAddressesProviderPolygonMainnet = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb";
  // const PoolAddressesProviderSepolia = "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A";
  // const PoolAddressesProviderEthereum = "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e";

  const flashLoan = await hre.ethers.deployContract("FlashLoan", ["0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e"]);

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
