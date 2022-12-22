import { ethers } from "hardhat";

async function main() {
  const gatekeeperOne = await ethers.getContractAt("GatekeeperOne", "0x924Ad48FCD74EA841F40123cac6479E21A5BAdc1");

  const GatekeeperOneAttacker = await ethers.getContractFactory("GatekeeperOneAttacker");
  const gatekeeperOneAttacker = await GatekeeperOneAttacker.deploy(gatekeeperOne.address);

  const tx = await gatekeeperOneAttacker.attack({ gasLimit: 51596 });
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
