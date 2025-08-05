import RoomDetail from "@/components/RoomDetail";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Room Detail",
};

export default function RoomDetailPage({
  params,
}: {
  params: { roomId: string };
}) {
  const roomId = params.roomId;

  return (
    <div className="mt-16">
      <Suspense fallback={<p>Loading....</p>}>
        <RoomDetail roomId={roomId} />
      </Suspense>
    </div>
  );
}
