import {
  LocalAccountSigner,
  type SmartAccountSigner,
  createSmartAccountClient,
  sepolia,
} from "@alchemy/aa-core";
import { createMultiOwnerModularAccount } from "@alchemy/aa-accounts";
import { http } from "viem";
import * as dotenv from "dotenv";
dotenv.config();

// Import the environment variables
const PRIV_KEY = process.env.PRIV_KEY!;
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;

// Define the constants
const chain = sepolia;
const signer: SmartAccountSigner = LocalAccountSigner.privateKeyToAccountSigner(
  `0x${PRIV_KEY}`
);
const rpcTransport = http(ALCHEMY_API_URL);

export const smartAccountClient = createSmartAccountClient({
  transport: rpcTransport,
  chain,
  account: await createMultiOwnerModularAccount({
    transport: rpcTransport,
    chain,
    signer,
  }),
});
