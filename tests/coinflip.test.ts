import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
	it("Should work", async () => {
		const CoinFlip = await ethers.getContractFactory("CoinFlip");
		const coinflip = await CoinFlip.deploy();

		const CoinFlipAttacker = await ethers.getContractFactory("CoinFlipAttacker");
		const coinflipAttacker = await CoinFlipAttacker.deploy(coinflip.address);

		for (let k = 0; k < 10; k++) {
			const tx = await coinflipAttacker.attack();
			await ethers.provider.send("evm_mine", []);
			await tx.wait(1);
		}

		expect(await coinflip.consecutiveWins()).to.eq(10);
	})
})
