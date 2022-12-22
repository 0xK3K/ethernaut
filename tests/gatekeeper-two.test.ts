import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
	it("Should work", async () => {
		const [, attacker] = await ethers.getSigners();
		const GatekeeperTwo = await ethers.getContractFactory("GatekeeperTwo");
		const gatekeeperTwo = await GatekeeperTwo.deploy();

		const GatekeeperTwoAttacker = await ethers.getContractFactory("GatekeeperTwoAttacker");
		await GatekeeperTwoAttacker.connect(attacker).deploy(gatekeeperTwo.address, { gasLimit: 150000 });

		expect(await gatekeeperTwo.entrant()).to.eq(attacker.address);
	})
})
