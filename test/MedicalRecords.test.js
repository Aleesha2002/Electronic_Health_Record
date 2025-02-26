const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("MedicalRecord", () => {
  let medical, user1, transactionResponse, transactionReceipt;
  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    user1 = accounts[1];
    const Medical = await ethers.getContractFactory("MedicalRecord");
      medical = await Medical.connect(user1).deploy();
  });
    describe("Deployed", () => {
        it("The contract is deployed successfully", async () => {
            expect(await medical.address).to.not.equal(0);
        });
    });
});
