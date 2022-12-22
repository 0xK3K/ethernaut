import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const simpleToken = await ethers.getContractAt("SimpleToken", "0x9d4add97b4b61f9dd0a9ee0f5fac78eb6b9e1321");

  await simpleToken.destroy(signer.address);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
