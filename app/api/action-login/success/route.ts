import { ChainEnum, verifyWithDynamic } from "@/lib/dynamic-api";
import { appURL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { signedMessage, address, chain, nonce } = body;
  const res = await verifyWithDynamic({
    signedMessage: signedMessage!,
    publicWalletAddress: address!,
    chain: chain as ChainEnum,
    nonce,
  });
  if (res.error) {
    return NextResponse.json(
      {
        message: "Failed to verify with Dynamic",
      },
      { status: 401 }
    );
  }
  const jwt = res.result.jwt;
  return NextResponse.json({
    url: `${appURL()}?token=${jwt}`,
  });
};
