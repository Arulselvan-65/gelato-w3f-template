import {
  Web3Function,
  Web3FunctionContext,
} from "@gelatonetwork/web3-functions-sdk";
import { Contract } from "@ethersproject/contracts";
import ky from "ky"; // we recommend using ky as axios doesn't support fetch by default

const DEFI_CONTRACT_ABI = [
  "function setInterestRate(uint256 _newRate) public",
  "function getInterestRate() public view returns (uint256)",
];

Web3Function.onRun(async (context: Web3FunctionContext) => {
  const { userArgs } = context; // Get user arguments from the context

  // Use the contract address from userArgs or default to a specific address
  const defiContractAddress =
    (userArgs.contractAddress as string) ??
    "0xa90b10a864fc2e5163264e2e2d3590fdad18ac9c";

  const defiContract = new Contract(defiContractAddress, DEFI_CONTRACT_ABI);

  let newInterestRate: any;
  try {
    // Define the API endpoint to fetch interest rates (example uses a sample API)
    const url = 'https://interest-rate-by-api-ninjas.p.rapidapi.com/v1/interestrate?country=United Kingdom'; // Replace with actual API
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'API_KEY',
        'x-rapidapi-host': 'interest-rate-by-api-ninjas.p.rapidapi.com'
      }
    }

    // Fetch interest rate data from the API using ky
    const response = await ky.get(url, options);
    const result : any = await response.json();
    newInterestRate = result.central_bank_rates[0].rate_pct; // Extract the interest rate from the response

  } catch (err) {
    return { canExec: false, message: "Failed to fetch interest rate"};
  }

  return {
    canExec: true,
    callData: [
      {
        to: defiContractAddress,
        data: defiContract.interface.encodeFunctionData("setInterestRate", [
          newInterestRate,
        ]),
      },
    ],
  };
});
