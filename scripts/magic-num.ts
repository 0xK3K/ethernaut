import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const magicNum = await ethers.getContractAt("MagicNum", "0x560B3D6F57C773130eDF5Bd70c1de6ef7ba8C2f3");

  const bytecode = [
    // init bytecode
    0x60, 0x0a, // PUSH1 10
    0x60, 0x0c, // PUSH1 12
    0x60, 0x00, // PUSH1 0
    0x39, // CODECOPY
    0x60, 0x0a, // PUSH1 10
    0x60, 0x00, // PUSH1 0
    0xf3, // RETURN

    // runtime bytecode
    0x60, 0x2a, 0x60, 0x80, 0x52, // PUSH1 42 PUSH1 80 MSTORE
    0x60, 0x20, 0x60, 0x80, 0xf3  // PUSH1 32 PUSH1 80 RETURN
  ];

  let tx = await signer.sendTransaction({ data: bytecode });
  await tx.wait(1);

  const { creates } = tx as any;
  tx = await magicNum.setSolver(creates);
  await tx.wait(1);

  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
