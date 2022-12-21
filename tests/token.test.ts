import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
	it("Should work", async () => {
		const [, attacker] = await ethers.getSigners();
		const Token = await ethers.getContractFactory("Token");
		const token = await Token.deploy(ethers.utils.parseUnits("20", 18));
		await token.transfer(attacker.address, ethers.utils.parseUnits("20", 18));

		const TokenAttacker = await ethers.getContractFactory("TokenAttacker");
		const tokenAttacker = await TokenAttacker.connect(attacker).deploy(token.address);

		await tokenAttacker.attack();

		expect((await token.balanceOf(attacker.address)).gt(ethers.utils.parseUnits("20", 18))).to.be.true;
	})
})
