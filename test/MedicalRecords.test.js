const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("MedicalRecord", () => {
  let medical, user1, transactionResponse, transactionReceipt;
  beforeEach(async () => {
    const account = await ethers.getSigners();
    user1 = account[1];
    const Medical = await ethers.getContractFactory("MedicalRecord");
    medical = await Medical.connect(user1).deploy();
  });
  describe("Deployed", () => {
    it("The contract is deployed successfully", async () => {
      expect(await medical.address).to.not.equal(0);
    });
  });
  describe("Add Record", () => {
    beforeEach(async () => {
      transactionResponse = await medical
        .connect(user1)
        .addRecord(
          "Wastron",
          "22",
          "Male",
          "B positive",
          "Dengue",
          "Dengue",
          "Dengue"
        );
      transactionReceipt = await transactionResponse.wait();
    });
    it("Emits a add Record event", async () => {
        // console.log("Transaction Receipt:", transactionReceipt);
        // console.log("Captured Events:", transactionReceipt.events);
        // const event = await transactionReceipt.events[0];
        // console.log("Transaction Logs:", transactionReceipt.logs);
        // const event = await transactionReceipt.logs[0]; // Access logs instead
        // expect(event).to.not.be.undefined;
        // console.log("event: ",event.event);
        // expect(event.event).to.equal("MedicalRecord_AddRecord");
        //transactionReceipt.logs has got data but not events

        const events = await medical.queryFilter("MedicalRecord_AddRecord");
        console.log("Queried Events:", events);
        expect(events.length).to.be.greaterThan(0);
        console.log("timstamp:::: ", events[0].args.timestamp);
        expect(events[0].args.timestamp).to.not.be.undefined;
        
        const args = events[0].args;
        console.log("args::::",args);
      //expect(args.timestamp).to.not.equal(0);
      expect(args.name).to.equal("Wastron");
      expect(args.age).to.equal("22");
      expect(args.gender).to.equal("Male");
      expect(args.bloodType).to.equal("B positive");
      expect(args.allergies).to.equal("Dengue");
      expect(args.diagnosis).to.equal("Dengue");
      expect(args.treatment).to.equal("Dengue");
    });
    // it("The getRecords function is working", async () => {
    //     const [
    //         timestamp, name, age, gender, bloodType, allergies, diagnosis, treatment
    //     ] = await medical.getRecord(await medical.getRecordId());
    // })
  });
});
