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
const rpcTransport = http(ALCHEMY_API_URL);

// Define the owner
const signer: SmartAccountSigner = LocalAccountSigner.privateKeyToAccountSigner(
  `0x${PRIV_KEY}`
);

console.log({ signer });

/**
 * @description Creates a smart contract account that can be used to send user operations.
 * @returns The smart contract account owner + provider, as a signer, that can be used to send user operations from the SCA
 */
export const smartAccountClient = createSmartAccountClient({
  transport: rpcTransport,
  chain,
  account: await createMultiOwnerModularAccount({
    transport: rpcTransport,
    chain,
    signer,
  }),
});
