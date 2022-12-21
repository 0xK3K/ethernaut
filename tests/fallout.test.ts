import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
	it("Should work", async () => {
		const [, attacker] = await ethers.getSigners();
		const Fallout = await ethers.getContractFactory("Fallout");
		const fallout = await Fallout.deploy();

		expect(await fallout.owner()).to.eq(attacker.address);
	})
})
