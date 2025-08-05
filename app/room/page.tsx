import HeaderSection from "@/components/HeaderSection";
import Main from "@/components/Main";
import RoomSkeleton from "@/components/skeletons/RoomSkeleton";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Room & Rates",
  description: "Choose your best room today",
};

export default function RoomPage() {
  return (
    <div>
      <HeaderSection
        title="Room & Rates"
        subTitle="Lorem ipsum dolor sit amet"
      />

      <div className="mt-10 px-4">
        <Suspense fallback={<RoomSkeleton />}>
          <Main />
        </Suspense>
      </div>
    </div>
  );
}
