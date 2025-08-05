import CheckoutDetail from "@/components/CheckoutDetail";
import { Metadata } from "next";
import Script from "next/script";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reservation Summary",
};

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const reservationId = params.id;

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20 mt-12">
      <h1 className="text-2xl font-semibold mb-8">Reservation Summary</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <CheckoutDetail reservationId={reservationId} />
      </Suspense>
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY"
        strategy="lazyOnload"
      />
    </div>
  );
}
