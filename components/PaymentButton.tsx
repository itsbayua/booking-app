"use client";

import { reservationProps } from "@/types/reservation";
import React, { useTransition } from "react";

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}

export default function PaymentButton({
  reservation,
}: {
  reservation: reservationProps;
}) {
  const [isPending, startTransition] = useTransition();
  const handlePayment = async () => {
    startTransition(async () => {
      try {
        const respon = await fetch("/api/payment", {
          method: "POST",
          body: JSON.stringify(reservation),
        });

        const { token } = await respon.json();

        if (token) {
          window.snap.pay(token);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <button
      onClick={handlePayment}
      className="px-10 py-4 mt-2 text-center font-semibold text-white w-full bg-orange-400 rounded-sm hover:bg-orange-500 cursor-pointer"
    >
      {isPending ? "Processing..." : "Pay Now"}
    </button>
  );
}
