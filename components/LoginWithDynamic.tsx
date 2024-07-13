"use client";
import { DynamicWidget, useRefreshUser } from "@dynamic-labs/sdk-react-core";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginWithDynamic() {
  const searchParams = useSearchParams();
  const refresh = useRefreshUser();
  const token = searchParams.get("token");
  useEffect(() => {
    if (token) {
      localStorage.setItem("dynamic_authentication_token", `"${token}"`);
      refresh();
    }
  }, [token, refresh]);
  return <DynamicWidget />;
}
