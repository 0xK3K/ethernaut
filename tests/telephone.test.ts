import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
  it("Should work", async () => {
    const [, attacker] = await ethers.getSigners();
    const Telephone = await ethers.getContractFactory("Telephone");
    const telephone = await Telephone.deploy();

    const TelephoneAttacker = await ethers.getContractFactory("TelephoneAttacker");
    const telephoneAttacker = await TelephoneAttacker.deploy(telephone.address);

    await telephoneAttacker.connect(attacker).attack();

    expect(await telephone.owner()).to.eq(attacker.address);
  })
})
