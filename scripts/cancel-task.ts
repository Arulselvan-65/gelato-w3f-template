import { JsonRpcProvider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { AutomateSDK } from "@gelatonetwork/automate-sdk";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.PRIVATE_KEY) throw new Error("Missing env PRIVATE_KEY");
const pk = process.env.PRIVATE_KEY;

if (!process.env.PROVIDER_URLS) throw new Error("Missing env PROVIDER_URL");
const providerUrl = process.env.PROVIDER_URLS.split(",")[0];
const main = async () => {

  // Instantiate provider & signer
  const provider = new JsonRpcProvider(providerUrl);
  const chainId = (await provider.getNetwork()).chainId;
  const wallet: any = new Wallet(pk as string, provider);
  const automate = new AutomateSDK(chainId, wallet);

  // Get all active tasks from Gelato Automate
  // const tasks = await automate.getActiveTasks();
  // console.log(tasks)

  // Cancel a specific task using its task ID
  const { tx } = await
    automate.cancelTask("0x74dd122d513a69559a17fbc6d0cdd27c76e6d0086f04a99d4de83b86c1270197");

  await tx.wait();
  console.log('Task cancelled');
};
main()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
  });
