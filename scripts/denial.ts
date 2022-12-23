import { ethers } from "hardhat";

async function main() {
  const denial = await ethers.getContractAt("Denial", "0xB2D80B060a74438D05266D1ECefDCD469cbeF0AB");

  const DenialAttacker = await ethers.getContractFactory("DenialAttacker");
  await DenialAttacker.deploy(denial.address, { value: ethers.utils.parseEther("0.001") });

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
