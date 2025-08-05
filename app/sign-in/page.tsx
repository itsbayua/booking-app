import { LoginGoogleButton } from "@/components/LoginButton";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage({
  searchParams,
}: {
  searchParams?: { redirect_url?: string };
}) {
  const redirectUrl = searchParams?.redirect_url?.startsWith("/")
    ? searchParams.redirect_url
    : `/${searchParams?.redirect_url ?? ""}`;

  return (
    <div className="min-h-screen flex items-center">
      <div className="bg-white w-96 mx-auto rounded-sm shadow p-8">
        <h1 className="text-4xl font-bold mb-1">Sign In</h1>

        <p className="font-medium mb-5 text-gray-500">
          Sign In To Your Account
        </p>

        <div className="py-4 text-center">
          <LoginGoogleButton redirectUrl={redirectUrl} />
        </div>
      </div>
    </div>
  );
}
