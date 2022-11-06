const { ethers } = require("hardhat");
const artifact = require("../artifacts-zk/contracts/MyZKSyncNFT.sol/MyZKSyncNFT.json");

const main = async () => {
  const [admin] = await ethers.getSigners();
  console.log("admin: ", admin.address);

  const contract = new ethers.Contract(
    "0x038890935747f67B45c83fe99a15B0A94AEb996c",
    artifact.abi,
    admin
  );

  let supply = await contract.totalSupply();
  console.log("initial supply: ", supply);

  const tx = await contract.mintTo(admin.address, "ipfs://some-uri/0");
  await tx.wait();
  console.log(tx);

  supply = await contract.totalSupply();
  console.log("new supply: ", supply);

  const tokenOwner = await contract.ownerOf(0);
  console.log("owner of token 0: ", tokenOwner);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
