import ReservationDetail from "@/components/ReservationDetail";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reservation Detail",
};

export default async function MyReservationDetail({
  params,
}: {
  params: { id: string };
}) {
  const reservationId = (await params).id;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-lg mx-auto mt-10 py-20 px-4">
        {/* Reservation Detail */}
        <Suspense fallback={<p>Loading...</p>}>
          <ReservationDetail reservationId={reservationId} />
        </Suspense>
      </div>
    </div>
  );
}
