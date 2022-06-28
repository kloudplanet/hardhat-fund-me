require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "http://localhost:8545";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.8",
      },
      {
        version: "0.6.6",
      },
    ],
  },
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [
        PRIVATE_KEY,
        "507453cf579568a20edb7aadae19a07d90dc44b2e98163ec3fe3e199115f55a0",
        "65713c469b521ffe6bcee4cea023ebe7b84d4aaea2848ec5864b066c12dd285d",
      ],
      chainId: 4,
      blockConfirmations: 6,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "./gas-reporter-report.json",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      4: 0,
    },
    feeCollector: {
      default: 1, // here this will by default take the second account as feeCollector (so in the test this will be a different account than the deployer)
      1: "0xa5610E1f289DbDe94F3428A9df22E8B518f65751", // on the mainnet the feeCollector could be a multi sig
      4: "0xa250ac77360d4e837a13628bC828a2aDf7BabfB3", // on rinkeby it could be another account
    },
  },
};
