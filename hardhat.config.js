require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  networks: {
    hardhat: {
      forking: {
        url: process.env.ALCHEMY_ETHEREUM_ENDPOINT,
      }
    },
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_ENDPOINT,
      accounts: [process.env.WALLET_PRIVATE_KEY]
    },
    mumbai: {
      url: process.env.ALCHEMY_POLYGON_TESTNET_ENDPOINT,
      accounts: [process.env.WALLET_PRIVATE_KEY]
    },
    polygon: {
      url: process.env.ALCHEMY_POLYGON_ENDPOINT,
      accounts: [process.env.HARDHAT_PRIVATE_KEY]
    }
  }
};
