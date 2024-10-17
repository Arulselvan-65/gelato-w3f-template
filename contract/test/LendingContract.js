const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LendingContract", function () {
  let LendingContract, contract, owner, addr1, addr2;

  beforeEach(async function () {
    // Deploying the contract before each test
    LendingContract = await ethers.getContractFactory("LendingContract");
    [owner] = await ethers.getSigners();
    contract = await LendingContract.deploy();
  });

  // Test: Initial interest rate
  it("Should have the initial interest rate set to 1", async function () {
    expect(await contract.getInterestRate()).to.equal(1);
  });

  // Test: Set interest rate by owner
  it("Owner should be able to set the interest rate", async function () {
    await contract.setInterestRate(5);
    expect(await contract.getInterestRate()).to.equal(5);
  });

  // Test: Deposit funds
  it("User should be able to deposit Ether", async function () {
    const depositAmount = ethers.parseEther("1.0");
    await contract.connect(owner).deposit({ value: depositAmount });

    const balance = await contract.balances(owner.address);
    expect(balance.toString()).to.equal(depositAmount.toString());
  });

  // Test: Withdraw funds
  it("User should be able to withdraw deposited Ether", async function () {
    const depositAmount = ethers.parseEther("1.0");
    const withdrawAmount = ethers.parseEther("0.5");

    await contract.connect(owner).deposit({ value: depositAmount });
    await contract.connect(owner).withdraw(withdrawAmount);

    const balance = await contract.balances(owner.address);
    expect(balance.toString()).to.equal(ethers.parseEther("0.5").toString());
  });

  // Test: Invalid withdrawal (insufficient balance)
  it("User should not be able to withdraw more than their balance", async function () {
    const depositAmount = ethers.parseEther("1.0");
    const withdrawAmount = ethers.parseEther("2.0");

    await contract.connect(owner).deposit({ value: depositAmount });

    await expect(contract.connect(owner).withdraw(withdrawAmount)).to.be.revertedWith("Insufficient balance");
  });

  // Test: Borrow funds
  it("User should be able to borrow Ether if they have sufficient collateral", async function () {
    const depositAmount = ethers.parseEther("1.0");
    const loanAmount = ethers.parseEther("0.5");

    await contract.connect(owner).deposit({ value: depositAmount });

    await contract.connect(owner).borrow(loanAmount);

    const loanBalance = await contract.loans(owner.address);
    expect(loanBalance.toString()).to.equal(loanAmount.toString());
  });
  
  // Test: Repay loan
  it("User should be able to repay their loan", async function () {
    const depositAmount = ethers.parseEther("1.0");
    const loanAmount = ethers.parseEther("0.5");

    await contract.connect(owner).deposit({ value: depositAmount });

    await contract.connect(owner).borrow(loanAmount);

    await contract.connect(owner).repayLoan({ value: loanAmount });

    const loanBalance = await contract.loans(owner.address);
    expect(loanBalance.toString()).to.equal("0");
  });

  // Test: Attempting to repay without a loan
  it("User should not be able to repay without an outstanding loan", async function () {
    await expect(contract.connect(owner).repayLoan({ value: ethers.parseEther("1.0") })).to.be.revertedWith("No outstanding loan");
  });
});
