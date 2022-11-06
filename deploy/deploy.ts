import { Wallet, Provider, utils } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import dotenv from "dotenv";

dotenv.config();

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log("Running deploy script for ZKSyncPayableNFT contract");

  const provider = new Provider(hre.userConfig.zkSyncDeploy?.zkSyncNetwork);
  const wallet = new Wallet(`${process.env.PRIVATE_KEY}`);

  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("ZKSyncPayableNFT");

  const deploymentFee = await deployer.estimateDeployFee(artifact, [
    "Payable ZK NFTs",
    "PZNFT",
    deployer.zkWallet.address,
    0,
  ]);

  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: utils.ETH_ADDRESS,
    amount: deploymentFee.mul(2),
  });
  await depositHandle.wait();

  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const contract = await deployer.deploy(artifact, [
    "Payable ZK NFTs",
    "PZNFT",
    deployer.zkWallet.address,
    0,
  ]);

  console.log(
    "constructor args: ",
    contract.interface.encodeDeploy([
      "Payable ZK NFTs",
      "PZNFT",
      deployer.zkWallet.address,
      0,
    ])
  );

  const contractAddress = contract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
