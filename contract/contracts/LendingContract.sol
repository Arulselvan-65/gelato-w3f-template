// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LendingContract {
    uint256 public interestRate;
    address public owner;
    
    mapping(address => uint256) public balances; // Track user deposits
    mapping(address => uint256) public loans;    // Track user loans
    

    constructor() {
        owner = msg.sender;
        interestRate = 1; 
    }

    // Set the interest rate
    function setInterestRate(uint256 _newRate) public  {
        interestRate = _newRate;
    }

    // View the current interest rate
    function getInterestRate() public view returns (uint256) {
        return interestRate;
    }

    // Deposit funds into the contract
    function deposit() external payable {
        require(msg.value > 0, "Must deposit some Ether");
        balances[msg.sender] += msg.value;
    }

    // Withdraw deposited funds
    function withdraw(uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    // Borrow funds (loan)
    function borrow(uint256 _amount) external {
        require(balances[msg.sender] >= (_amount / 2), "Collateral required (50%)");
        loans[msg.sender] += _amount;
        payable(msg.sender).transfer(_amount);
    }

    // Repay borrowed funds (loan)
    function repayLoan() external payable {
        require(loans[msg.sender] > 0, "No outstanding loan");
        require(msg.value >= loans[msg.sender], "Not enough to repay loan");
        loans[msg.sender] = 0;
    }
}
