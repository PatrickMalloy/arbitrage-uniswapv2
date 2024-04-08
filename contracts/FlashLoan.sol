// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import { FlashLoanSimpleReceiverBase } from "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import { IPoolAddressesProvider } from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import { IERC20 } from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

contract FlashLoan is FlashLoanSimpleReceiverBase {
  address payable owner;
  IUniswapV2Router02 public buyDexRouter;
  IUniswapV2Router02 public sellDexRouter;
  address borrowToken;
  address sellToken;

  constructor(address _addressProvider) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {
    owner = payable(msg.sender);
  }

  function executeOperation (
    address asset,
    uint256 amount,
    uint256 premium,
    address initiator,
    bytes calldata params
  ) external override returns (bool) {
    // borrowed funds available. do custom logic
    address[] memory path = new address[](2);
    path[0]=borrowToken;
    path[1]=sellToken;

    // buyDexRouter.swapExactTokensForTokens(amount, 0, path, address(this), block.timestamp);
    buyDexRouter.swapExactTokensForTokens(IERC20(borrowToken).balanceOf(address(this)), 0, path, address(this), block.timestamp);
    path[0]=sellToken;
    path[1]=borrowToken;
    sellDexRouter.swapExactTokensForTokens(IERC20(sellToken).balanceOf(address(this)), 0, path, address(this), block.timestamp);

    // Return funds + premium to Aave
    uint256 amountOwed = amount + premium;
    IERC20(asset).approve(address(POOL), amountOwed);

    return true;
  }

  function doArbitrage(address _borrowToken, address _sellToken, uint256 _amountBorrow, address _buyDex, address _sellDex) public {
    buyDexRouter = IUniswapV2Router02(_buyDex);
    sellDexRouter = IUniswapV2Router02(_sellDex);
    borrowToken = _borrowToken;
    sellToken = _sellToken;

    requestFlashLoan(_borrowToken, _amountBorrow);
  }

  function requestFlashLoan(address _token, uint256 _amount) public {
    address receiverAddress = address(this);
    address asset = _token;
    uint256 amount = _amount;
    bytes memory params = "";
    uint16 referralCode = 0;

    POOL.flashLoanSimple(
      receiverAddress,
      asset,
      amount,
      params,
      referralCode
    );
  }
  
  function getBalance(address _tokenAddress) external view returns (uint256) {
    return IERC20(_tokenAddress).balanceOf(address(this));
  }

  function withdraw(address _tokenAddress) external onlyOwner {
    IERC20 token = IERC20(_tokenAddress);
    token.transfer(msg.sender, token.balanceOf(address(this)));
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only contract owner can call this function");
    _;
  }

  receive() external payable {}
}