require("@nomiclabs/hardhat-waffle");
require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");
import dotenv from "dotenv";

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.2.0",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },

  zkSyncDeploy: {
    zkSyncNetwork: "https://zksync2-testnet.zksync.dev",
    ethNetwork: "goerli",
  },

  networks: {
    hardhat: {
      zksync: true,
    },
    zksync_check: {
      url: "https://zksync2-testnet.zksync.dev",
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
