"use client";

import { ItemGroup } from "@/components/ui/item";
import { Button } from "@/components/ui/button";

import PlanItem from "./PlanItem";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredPlans } from "@/features/plans/planSelectors";
import { fetchPlans } from "@/features/plans/planThunks";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { daySet } from "@/utils/constants";

export default function PlanItems() {
  const dispatch = useDispatch();

  const days = useSelector(selectFilteredPlans);
  console.log(days);

  const itemRefs = useRef<Record<number, HTMLHeadingElement | null>>({});

  const today = new Date();
  const dayOfWeek = today.getDay();

  useEffect(() => {
    // if (!days.length) {
    dispatch(
      fetchPlans({ year: 3, direction: "informatics", day: "2026-02-02" })
    );
    // }
  }, [days.length, dispatch]);

  const scrollToItem = (itemId: number) => {
    const targetRef = itemRefs.current[itemId];
    if (targetRef) {
      targetRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="absolute bottom-2 right-2 z-51">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => scrollToItem(dayOfWeek)}
        >
          Go to today
        </Button>
      </div>

      <div className="flex w-full max-w-md flex-col gap-16">
        {days.map((day, i) => {
          const index = i + 1;

          return (
            <div
              key={index}
              className="min-h-fit flex flex-col gap-6 relative set-background-day rounded-2xl"
            >
              <h3
                className={`text-lg font-medium top-0 sticky z-50 set-bg-base ${
                  dayOfWeek === index ? "set-today-border" : "set-day-border"
                }`}
                ref={(el) => (itemRefs.current[index] = el)}
              >
                {daySet[day.day]}
              </h3>

              <ItemGroup className="gap-3 px-3 pb-4">
                <PlanItem lessons={day.lessons} />
              </ItemGroup>
            </div>
          );
        })}
      </div>
    </div>
  );
}
