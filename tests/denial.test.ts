import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
  it("Should work", async () => {
    const [, attacker] = await ethers.getSigners();
    const Denial = await ethers.getContractFactory("Denial");
    const denial = await Denial.deploy();

    const DenialAttacker = await ethers.getContractFactory("DenialAttacker");
    await DenialAttacker.deploy(denial.address, { value: ethers.utils.parseEther("0.001") });

    expect((await denial.contractBalance()).isZero()).to.be.false;
    await expect(denial.withdraw({ gasLimit: 1000000 })).to.be.reverted;
  })
})
