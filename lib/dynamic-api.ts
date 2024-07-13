import { baseSepolia } from "viem/chains";
import { generateSIWEMessage } from "./siwe";
import { createSiweMessage, generateSiweNonce } from "viem/siwe";
import { appURL } from "./utils";

export declare enum ChainEnum {
  ETH = "ETH",
  EVM = "EVM",
}

export interface VerifyRequest {
  signedMessage: string;
  messageToSign: string;
  publicWalletAddress: string;
  chain: ChainEnum;
  walletName: string;
  walletProvider: "browserExtension";
}

export interface VerifyResponse {
  mfaToken?: string;
  jwt?: string;
  user: any;
  minifiedJwt?: string;
  expiresAt: number;
}

export const verifyWithDynamic = async (data: {
  signedMessage: string;
  publicWalletAddress: string;
  chain: ChainEnum;
  nonce: string;
}) => {
  console.log("Verifying with Dynamic");
  console.log({
    domain: appURL().replace("https://", ""),
    address: data.publicWalletAddress as `0x${string}`,
    uri: appURL(),
    version: "1",
    chainId: baseSepolia.id,
    nonce: data.nonce,
  });
  const messageToSign = createSiweMessage({
    domain: appURL().replace("https://", ""),
    address: data.publicWalletAddress as `0x${string}`,
    uri: appURL(),
    version: "1",
    chainId: baseSepolia.id,
    nonce: data.nonce,
  });
  console.log({
    messageToSign,
  });
  const body: VerifyRequest = {
    signedMessage: data.signedMessage,
    messageToSign,
    publicWalletAddress: data.publicWalletAddress,
    chain: data.chain,
    walletName: "evm-action",
    walletProvider: "browserExtension",
  };
  console.log(body);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  try {
    const res = await fetch(
      `https://app.dynamicauth.com/api/v0/sdk/${process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID}/verify`,
      options
    );
    if (!res.ok) {
      throw new Error("Failed to verify with Dynamic");
    }
    const data = await res.json();
    return {
      error: false,
      result: data,
    };
  } catch (e) {
    console.error(e);
    return {
      error: true,
    };
  }
};
