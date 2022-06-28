const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

// // { getNamedAccounts, deployments } = hre
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  log(await getNamedAccounts());
  let ethUsdPriceFeedAddress;

  // 31337 is the local network id and in local blockchain there is no price feed contrant so we use a mock one.
  if (chainId == 31337) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  log({ ethUsdPriceFeedAddress, deployer, chainId });
  log("----------------------------------------------------");
  log("Deploying FundMe and waiting for confirmations...");

  const FundME = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress], // FuneMe constructor arguments
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`FundMe deployed at ${FundME.address}`);

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(FundME.address, [ethUsdPriceFeedAddress]);
  }
};

module.exports.tags = ["all", "fundme"];
