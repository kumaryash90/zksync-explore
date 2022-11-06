const { ethers } = require("hardhat");
const artifact = require("../artifacts-zk/contracts/ZKSyncPayableNFT.sol/ZKSyncPayableNFT.json");

const main = async () => {
  const [admin] = await ethers.getSigners();
  console.log("admin: ", admin.address);

  const contract = new ethers.Contract(
    "0xF73EFC402e9467ED756598193dD74ac4C1615724",
    artifact.abi,
    admin
  );

  // let supply = await contract.totalSupply();
  // console.log("initial supply: ", supply);

  // let name = await contract.name();
  // console.log("name: ", name);

  // const tx = await contract.lazyMint(100, "ipfs://some-uri/", []);
  // await tx.wait();
  // console.log("tx hash: ", tx.hash);

  // const nextTokenIdToMint = await contract.nextTokenIdToMint();
  // console.log("next token id to mint: ", nextTokenIdToMint);

  const tx = await contract.claim(admin.address, 2, {
    value: ethers.utils.parseEther("0.002"),
  });
  await tx.wait();
  console.log("tx hash: ", tx.hash);

  const nextTokenIdToClaim = await contract.nextTokenIdToClaim();
  console.log("next token id to claim: ", nextTokenIdToClaim);

  let supply = await contract.totalSupply();
  console.log("new supply: ", supply);

  // const tokenOwner = await contract.ownerOf(1);
  // console.log("owner of token 1: ", tokenOwner);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
