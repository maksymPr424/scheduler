"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function CalendarOwn() {
  const currentDay = new Date();

  const startSemester = new Date(2025, 8, 1);
  const endSemester = new Date(2026, 2, 22);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(currentDay);
  const [error, setError] = useState(false);

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Select date";

    if (date < startSemester || date > endSemester) {
      if (!error) setError(true);
      return "Select date";
    }

    if (error) {
      setError(false);
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  console.log(error);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          Znajdż za datą
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-32 justify-between font-normal"
            >
              {formatDate(date)}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
        {error && (
          <span className="text-red-400 text-sm">
            Proszę wybrać datę z tego semestru
          </span>
        )}
      </div>
    </div>
  );
}
