const { ethers } = require("ethers");
const { abi } = require("../artifacts/contracts/FlashLoan.sol/FlashLoan.json");

const USDC = "0x52D800ca262522580CeBAD275395ca6e7598C014";
const WETH = "0xc199807AF4fEDB02EE567Ed0FeB814A077de4802";

const UNISWAP_ROUTER="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const QUICKSWAP_ROUTER="0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";

let provider;
let signer;
let arbContract;

const contractAddress = "0x0659a97068958ebaba97121a6d7a2a95924824ea";

async function init() {
  provider = new ethers.JsonRpcProvider("http://localhost:8545");
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
  getBalance("0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359");
  doArb(USDC, WETH, "1", UNISWAP_ROUTER, QUICKSWAP_ROUTER);
  getBalance("0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359");
}

main()