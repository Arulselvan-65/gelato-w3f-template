require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    buildbear: {
      url: process.env.PROVIDER_URL,
      chainId: 1,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
  },
};
