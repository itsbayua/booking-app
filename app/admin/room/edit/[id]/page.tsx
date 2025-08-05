import EditRoom from "@/components/admin/room/EditRoom";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export default function UpdateRoomPage({ params }: { params: { id: string } }) {
  const roomId = params.id;

  if (!roomId) {
    return notFound();
  }

  return (
    <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
      <Suspense fallback={<p>Loading....</p>}>
        <EditRoom roomId={roomId} />
      </Suspense>
    </div>
  );
}
