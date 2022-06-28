const { network } = require("hardhat");

const DECIMALS = "8";
const INITIAL_PRICE = "200000000000"; // 2000
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  if (chainId === 31337) {
    log("Local network detected! Deploying mocks...");
    await deploy("MockV3Aggregator", {
      contracr: "MockV3Aggregator",
      from: deployer,
      args: [DECIMALS, INITIAL_PRICE], // MockV3Aggregator constructor arguments,
      log: true,
    });

    log("Mocks Deployed!");
    log("------------------------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];
