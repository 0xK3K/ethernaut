import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
	it("Should work", async () => {
		const Elevator = await ethers.getContractFactory("contracts/Elevator.sol:Elevator");
		const elevator = await Elevator.deploy();

		const Building = await ethers.getContractFactory("contracts/Building.sol:Building");
		const building = await Building.deploy(elevator.address);

		await building.attack();

		expect(await elevator.top()).to.be.true;
	})
})
