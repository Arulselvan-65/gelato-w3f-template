
# DeFi Lending Smart Contract

This project is a simple lending smart contract built with Solidity, designed to allow users to deposit Ether, borrow funds, and repay loans with dynamically adjustable interest rates.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Smart Contract Overview](#smart-contract-overview)
- [Functions](#functions)
- [Testing](#testing)

## Prerequisites

Before starting, ensure you have the following tools installed and set up:

- **Node.js** and **npm**: To manage dependencies.
- **Hardhat**: For smart contract development.
- **BuildBear** account: Set up an account at BuildBear to create custom blockchain environments.
- **MetaMask**: To interact with Ethereum networks.

## Smart Contract Overview

The `LendingContract` allows users to:
- Deposit Ether.
- Withdraw deposited funds.
- Borrow funds based on their deposit collateral.
- Repay borrowed funds.
- Adjust the interest rate.



## Setup Instructions

### 1. Clone the Repository

Start by cloning the repository:

```bash
git clone https://github.com/Arulselvan-65/gelato-w3f-template.git
```

### 2. Navigate to the Project Directory

```bash
cd gelato-w3f-template/contract
```

### 3. Install Dependencies

Install all the required npm packages:

```bash
npm install
```

### 4. Configure Environment Variables

Add the following content to the `.env` file:

```bash
PROVIDER_URLS=BUILDBEAR_RPC_URL
PRIVATE_KEY=YOUR_PRIVATE_KEY
```

You can obtain this from the [Buildbear Dashboard](https://buildbear.io) after signing up.

### 5. Compile the Contract

Before deploying the contract, compile it with Hardhat:

```bash
npx hardhat compile
```

### 6. Deploy the Contract

Deploy the contract by running:

```bash
npx hardhat run scripts/deploy.js --network buildbear
```

### 7. Running Tests

Once the contract is deployed, run your unit tests.

```bash
npx hardhat test 
```

## Testing

The contract has been tested with the following scenarios:

- **Initial interest rate**: Verify that the initial interest rate is set to 1.
- **Set interest rate**: Ensure the owner can change the interest rate.
- **Deposit funds**: Confirm users can deposit Ether.
- **Withdraw funds**: Validate that users can withdraw their deposited Ether.
- **Invalid withdrawal**: Check that users cannot withdraw more than their balance.
- **Repay loan**: Confirm users can repay their loans.
- **Attempting to repay without a loan**: Verify that users cannot repay without an outstanding loan.

![Testing Results](path_to_your_image)


## Learn More

To learn more about Buildbear or Hardhat, visit the official documentation:
- [Buildbear Sandbox](https://buildbear.io)
- [Hardhat Documentation](https://hardhat.org)

