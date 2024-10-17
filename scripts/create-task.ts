import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { AutomateSDK, TriggerType } from "@gelatonetwork/automate-sdk";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.PRIVATE_KEY) throw new Error("Missing env PRIVATE_KEY");
const pkey = process.env.PRIVATE_KEY;

if (!process.env.PROVIDER_URLS) throw new Error("Missing env PROVIDER_URL");
const providerUrl = process.env.PROVIDER_URLS.split(",")[0];

const main = async () => {

  // Initialize provider & signer (wallet)
  const provider = new JsonRpcProvider(providerUrl);
  const chainId = (await provider.getNetwork()).chainId;
  const wallet: any = new Wallet(pkey as string, provider);
  const automate = new AutomateSDK(chainId, wallet);

  // Deploy Web3Function on IPFS
  console.log("Deploying Web3Function on IPFS...");

  const cid = "QmYt6CM6i2qGG9urmdLAJv9dywdfirpGHxCYwFSWFTMGm3"; // Content Identifier (CID) of the Web3Function deployed on IPFS


  // Create a task using Gelato Automate SDK
  console.log("Creating automate task...");
  const { taskId, tx } = await automate.createBatchExecTask({
    name: "Web3Function - LendingContract",  // Name of the task
    web3FunctionHash: cid,
    web3FunctionArgs: {
      "contractAddress": "0xa90b10a864fc2e5163264e2e2d3590fdad18ac9c" // Argument passed to Web3Function
    },
    trigger: {
      interval: 30 * 1000,  // Set the task trigger interval to 30 seconds
      type: TriggerType.TIME,
    },
  });
  await tx.wait();
  console.log(`Task created, taskId: ${taskId} (tx hash: ${tx.hash})`);
};

main()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
  });
