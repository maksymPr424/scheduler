"use client";

import React from "react";
// import { CalendarOwn } from "@/app/components/CalendarOwn";
import PlanItems from "@/app/components/PlanItems";
import Agent from "@/app/components/Agent";
import FormFilterLessons from "@/app/components/FormFilterLessons";
import HeadComponents from "@/app/components/HeadComponents";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-3 items-start relative">
      {/* <CalendarOwn /> */}
      {/* <Agent /> */}
      {/* Uncomment if Agent component is needed */}
      {/* Place for filters */}
      <HeadComponents />
      <div className="min-w-min w-full min-h-[62vh] max-h-[62vh]  overflow-y-auto flex-1 rounded-2xl">
        <PlanItems />
      </div>
    </div>
  );
}
