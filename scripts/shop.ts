import { ethers } from "hardhat";

async function main() {
  const shop = await ethers.getContractAt("Shop", "0x360F9194Fe322d3FD823c4fe27ae5159be223402");

  const Buyer = await ethers.getContractFactory("Buyer");
  const buyer = await Buyer.deploy(shop.address);

  await buyer.buy({ gasLimit: 80003 });

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
