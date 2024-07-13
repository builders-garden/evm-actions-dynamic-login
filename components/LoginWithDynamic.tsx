"use client";
import {
  DynamicWidget,
  useRefreshUser,
  useReinitialize,
} from "@dynamic-labs/sdk-react-core";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

let didSaveToken = false;

export default function LoginWithDynamic() {
  const searchParams = useSearchParams();
  const refresh = useReinitialize();
  const jwt = searchParams.get("jwt");
  const minJwt = searchParams.get("minJwt");
  useEffect(() => {
    if (jwt && !didSaveToken) {
      console.log("Saving tokens", {
        jwt,
        minJwt,
      });
      didSaveToken = true;
      localStorage.setItem("dynamic_authentication_token", `"${jwt}"`);
      localStorage.setItem("dynamic_min_authentication_token", `"${minJwt}"`);
      refresh();
    }
  }, []);
  return <DynamicWidget />;
}
