require('dotenv').config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.6.0" },
      { version: "0.6.12" },
      { version: "0.8.17" }
    ],
  },
  networks: {
    hardhat: {
      forking: {
        enabled: false,
        url: `https://rpc.ankr.com/eth_goerli`
      }
    },
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli`,
      accounts: [process.env.PRIVATE_KEY as string]
    }
  }
};

export default config;
