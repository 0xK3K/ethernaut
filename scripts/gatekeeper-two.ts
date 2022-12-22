import { ethers } from "hardhat";

async function main() {
  const gatekeeperTwo = await ethers.getContractAt("GatekeeperTwo", "0xf0a4c16FCC391E88a824E1D65AD885EaA0bbDDB2");

  const GatekeeperTwoAttacker = await ethers.getContractFactory("GatekeeperTwoAttacker");
  await GatekeeperTwoAttacker.deploy(gatekeeperTwo.address, { gasLimit: 150000 });

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
