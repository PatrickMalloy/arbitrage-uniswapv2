const { ethers } = require("ethers");
const { abi } = require("../artifacts/contracts/FlashLoan.sol/FlashLoan.json");
require("dotenv").config();

const USDC = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8";
const WETH = "0xc199807AF4fEDB02EE567Ed0FeB814A077de4802";
const LINK = "0xf8Fb3713D459D7C1018BD0A49D19b4C44290EBE5";

const UNISWAPV2_ROUTER="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const SUSHISWAP_ROUTER = "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F";
const FRAXSWAP_ROUTER = "0xC14d550632db8592D1243Edc8B95b0Ad06703867";
const SMARDEX_ROUTER = "0xC33984ABcAe20f47a754eF78f6526FeF266c0C6F";

let provider;
let wallet;
let signer;
let arbContract;

//const contractAddress = "0xfF9448F5CBDfB82eE70565a02c6000F82a2Ff5dE";
const contractAddress = "0x4f1F87d512650f32bf9949C4c5Ef37a3cc891C6D";

async function init() {
  //provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/nFx2tXJimmdSNZBqGkN4gFQb3MGKRsw0");
  provider = new ethers.JsonRpcProvider("http://localhost:8545");
  wallet = new ethers.Wallet(process.env.HARDHAT_PRIVATE_KEY, provider);
  arbContract = new ethers.Contract(contractAddress, abi, wallet);
}

async function getBalance(_token) {
  let balance = await arbContract.getBalance(_token);
  console.log(`token balance: ${balance}`);
}

async function doArb(borrowToken, sellToken, amount, buyDex, sellDex) {
  let _amount = ethers.parseEther(amount);
  await arbContract.doArbitrage(borrowToken, sellToken, _amount, buyDex, sellDex);
}

async function main() {
  await init();
  await getBalance(USDC);
  //doArb(USDC, WETH, "1", UNISWAPV2_ROUTER, SUSHISWAP_ROUTER);
  await getBalance(USDC);
}

main()