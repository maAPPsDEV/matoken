const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MAToken", function () {
  let alice, bob;
  let mat;

  beforeEach(async () => {
    [alice, bob] = await ethers.getSigners();
    const MAToken = await ethers.getContractFactory("MAToken");
    mat = await MAToken.deploy();
    await mat.deployed();
  });

  it("Should return the symbol", async function () {
    expect(await mat.symbol()).to.equal("MAT");
  });

  context("with the single-step transfer scenario", async () => {
    it("Should transfer token", async () => {
      await mat.connect(alice).transfer(bob.address, 100);
      expect(await mat.balanceOf(bob.address)).to.equal(100);
    });
  });

  context("with the two-step transfer scenario", async () => {
    it("Should approve and then transfer token when the approved address calls transferFrom", async () => {
      await mat.connect(alice).approve(bob.address, 100);
      await mat.connect(bob).transferFrom(alice.address, bob.address, 100);
      expect(await mat.balanceOf(bob.address)).to.equal(100);
    });
  });
});
