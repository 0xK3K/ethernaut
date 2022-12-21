import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
	it("Should work", async () => {
		const [owner, attacker] = await ethers.getSigners();
		const initialBalance = await attacker.getBalance();

		const Reentrance = await ethers.getContractFactory("Reentrance");
		const reentrance = await Reentrance.deploy();
		await reentrance.donate(owner.address, { value: ethers.utils.parseEther("42") });
		expect(await reentrance.balanceOf(owner.address)).to.eq(ethers.utils.parseEther("42"));

		const ReentranceAttacker = await ethers.getContractFactory("ReentranceAttacker");
		const reentranceAttacker = await ReentranceAttacker.connect(attacker).deploy(reentrance.address);
		await reentranceAttacker.connect(attacker).attack({ value: ethers.utils.parseEther("1") });
		expect(await attacker.getBalance()).to.be.approximately(initialBalance.add(ethers.utils.parseEther("43")), ethers.utils.parseEther("2"));
	})
})
