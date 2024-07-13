import { appURL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const evmActionMetadata: EVMAction = {
    title: "Dynamic Login EVM Action",
    description:
      "This is a sample EVM action integrating Dynamic 1-click Login",
    image: "https://placehold.co/955x500",
    links: [
      {
        targetUrl: `${appURL()}/api/action-login`,
        postUrl: appURL(), // this will be a GET HTTP call
        label: "1-click login",
        type: ActionLinkType.ONE_CLICK_LOGIN,
      },
    ],
    label: "Sample Button",
  };
  return NextResponse.json(evmActionMetadata);
};
