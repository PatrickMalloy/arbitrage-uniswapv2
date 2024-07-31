const { ethers } = require("ethers");
const { abi } = require("../artifacts/contracts/FlashLoan.sol/FlashLoan.json");
require("dotenv").config();

const USDC = "0x52D800ca262522580CeBAD275395ca6e7598C014";
const WETH = "0xc199807AF4fEDB02EE567Ed0FeB814A077de4802";

const UNISWAP_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const QUICKSWAP_ROUTER = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";
const SUSHISWAP_ROUTER = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
const FRAXSWAP_ROUTER = "0xE52D0337904D4D0519EF7487e707268E1DB6495F";
const SMARDEX_ROUTER = "0xedD758D17175Dc9131992ebd02F55Cc4ebeb7B7c";

let provider;
let signer;
let arbContract;

const contractAddress = "0xCC7661a207d613bddAd634b78Da143E91B80008e";

async function init() {
  provider = new ethers.JsonRpcProvider(ALCHEMY_POLYGON_TESTNET_ENDPOINT);
  signer = await provider.getSigner();
  arbContract = new ethers.Contract(contractAddress, abi, signer);
}

//console.log(arbContract);

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
  getBalance(USDC);
  //doArb(USDC, WETH, "1", UNISWAP_ROUTER, QUICKSWAP_ROUTER);
  getBalance(USDC);
}

main()