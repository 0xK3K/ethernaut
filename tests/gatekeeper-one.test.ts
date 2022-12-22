import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
	it("Should work", async () => {
		const [, attacker] = await ethers.getSigners();
		const GatekeeperOne = await ethers.getContractFactory("GatekeeperOne");
		const gatekeeperOne = await GatekeeperOne.deploy();

		const GatekeeperOneAttacker = await ethers.getContractFactory("GatekeeperOneAttacker");
		const gatekeeperOneAttacker = await GatekeeperOneAttacker.connect(attacker).deploy(gatekeeperOne.address);

		// brute force the shit out of this value
		await gatekeeperOneAttacker.connect(attacker).attack({ gasLimit: 51765 });

		expect(await gatekeeperOne.entrant()).to.eq(attacker.address);
	})
})
