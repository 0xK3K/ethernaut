import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
  it("Should work", async () => {
    const [owner] = await ethers.getSigners();
    const Force = await ethers.getContractFactory("Force");
    const force = await Force.deploy();

    const ForceAttacker = await ethers.getContractFactory("ForceAttacker");
    const forceAttacker = await ForceAttacker.deploy(force.address);

    await owner.sendTransaction({ to: forceAttacker.address, value: "42" });
    await forceAttacker.explode();

    expect((await ethers.provider.getBalance(force.address)).isZero()).to.be.false;
  })
})
