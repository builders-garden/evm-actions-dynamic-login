"use client";
import { ChainEnum, verifyWithDynamic } from "@/lib/dynamic-api";
import { appURL } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function ActionLoginPage({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const signedMessage = searchParams.get("signedMessage");
  const address = searchParams.get("address");
  const chain = searchParams.get("chain");

  const getDynamicJWT = useCallback(async () => {
    const res = await verifyWithDynamic({
      signedMessage: signedMessage!,
      publicWalletAddress: address!,
      chain: chain as ChainEnum,
    });
    if (res.error) {
      console.error("Failed to verify with Dynamic");
      return;
    }
    redirect(`${appURL()}?token=${res.result.jwt}`);
  }, [address, chain, signedMessage]);

  useEffect(() => {
    getDynamicJWT();
  }, [getDynamicJWT]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Transaction Successful
        </p>
      </div>
    </main>
  );
}
