# How to Build a DeFi App Using Gelato Web3 Functions and Buildbear Sandbox

## Overview

This project demonstrates how to create a basic decentralized finance (DeFi) application using Gelato Web3 Functions and Buildbear Sandbox. The application features an interest-rate monitoring system that automatically updates interest rates based on external market conditions.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Creating Web3 Functions](#creating-web3-functions)
- [Testing Web3 Function](#testing-web3-function)
- [Creating and Executing Tasks](#creating-and-executing-tasks)
- [Cancelling Tasks](#cancelling-tasks)
- [License](#license)

## Technologies Used

- Gelato Web3 Functions
- Buildbear Sandbox
- TypeScript
- Node.js

## Getting Started

To get started with the project, follow the instructions below to set up your environment and run the application.

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Arulselvan-65/gelato-w3f-template.git
   cd gelato-w3f-template
   ```

2. **Install Dependencies:**

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add your private key and RPC URL:

   ```plaintext
   PRIVATE_KEY=YOUR_PRIVATE_KEY
   PROVIDER_URLS=https://rpc.buildbear.io/username
   ```

### Creating Web3 Functions

To create Web3 Functions, follow these steps:

1. **Select Trigger Type:** Choose between time-based, event-based, or every block triggers.
2. **Choose Task Type:** Select between TypeScript Function or Solidity Function.
3. **Create Web3 Function Task:** Connect your Web3 function to a targeted smart contract for execution.
4. **Finalize and Monitor Tasks:** Use the explorer to monitor task outcomes.

### Testing Web3 Function

To test your Web3 Function, run the following command:

```bash
npx w3f test web3-function/index.ts --logs --chain-id=1
```

### Creating and Executing Tasks

To create and execute tasks, follow these steps:

1. **Run the Script to Create a Task:**

   ```bash
   ts-node scripts/create-task.ts
   ```

2. **Monitor Transactions:** Navigate to the Sandbox Explorer to inspect the transaction.

### Cancelling Tasks

To cancel a task, run the following command:

```bash
ts-node scripts/cancel-task.ts
```



### Notes:

- Replace `YOUR_PRIVATE_KEY` with the actual private key and ensure it remains confidential.
- You may want to include more details or modify sections based on your project specifics, such as usage examples or additional setup instructions.
