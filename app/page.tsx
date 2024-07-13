"use client";
import LoginWithDynamic from "@/components/LoginWithDynamic";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center w-full gap-8">
          <h1 className="text-4xl font-bold text-center">
            1-click login with Dynamic using EVM Actions
          </h1>
          <LoginWithDynamic />
        </div>
      </div>
    </main>
  );
}
