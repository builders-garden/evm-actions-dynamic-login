import { error } from "console";

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
  messageToSign: string;
  publicWalletAddress: string;
  chain: ChainEnum;
}) => {
  const body: VerifyRequest = {
    signedMessage: data.signedMessage,
    messageToSign: data.messageToSign,
    publicWalletAddress: data.publicWalletAddress,
    chain: ChainEnum.ETH,
    walletName: "evm-action",
    walletProvider: "browserExtension",
  };
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
