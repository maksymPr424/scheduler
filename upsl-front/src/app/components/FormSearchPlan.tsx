"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../lib/hooks";
import { schema, Ischema } from "../validations/searchPlanValidation";

import { fetchPlans } from "../../features/plans/planThunks";
import { fetchDirections } from "@/features/directions/directionsThunks";

import {
  selectActiveDirection,
  selectDirections,
  selectYears,
} from "@/features/directions/directionsSelectors";

import { setActiveDirection } from "@/features/directions/directionsSlice";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ---- helpers ----
function normalizeValue(v: unknown): string {
  return String(v ?? "")
    .trim()
    .toLowerCase();
}

function toLabel(v: string): string {
  const s = String(v ?? "").trim();
  if (!s) return "";
  // "computer_science" -> "Computer science", "spec kurs 1" -> "Spec kurs 1"
  const cleaned = s.replace(/[_-]+/g, " ");
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export default function FormSearchPlan() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // --- hydration gate (avoid SSR mismatch) ---
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // --- redux ---
  const rawDirections = useSelector(selectDirections); // might contain mixed-case
  const rawYears = useSelector(selectYears); // number[]
  const active = useSelector(selectActiveDirection); // {direction, year} | null
  const plansError = useSelector((state) => state.plans.error);

  // Fetch directions once after mount
  useEffect(() => {
    if (mounted) dispatch(fetchDirections());
  }, [dispatch, mounted]);

  // Normalize directions to lowercase values, keep labels capitalized
  const directions = useMemo(() => {
    // Map to unique lowercase values, filter out empty
    const vals = rawDirections
      .map((d) => normalizeValue(d))
      .filter((d) => d.length > 0);

    return Array.from(new Set(vals));
  }, [rawDirections]);

  const years = useMemo(() => {
    // keep only valid numbers
    return (rawYears ?? []).filter(
      (y) => typeof y === "number" && Number.isFinite(y)
    );
  }, [rawYears]);

  // Normalize active values (so form value ALWAYS matches SelectItem values)
  const activeDirection = useMemo(
    () => normalizeValue(active?.direction),
    [active]
  );
  const activeYearStr = useMemo(
    () => (active?.year != null ? String(active.year) : ""),
    [active]
  );

  const isReady = mounted && directions.length > 0 && years.length > 0;

  // Pick safe defaults that EXIST in options (critical for shadcn Select)
  const safeDirection = useMemo(() => {
    if (activeDirection && directions.includes(activeDirection))
      return activeDirection;
    return directions[0];
  }, [activeDirection, directions]);

  const safeYear = useMemo(() => {
    const yearsStr = years.map(String);
    if (activeYearStr && yearsStr.includes(activeYearStr)) return activeYearStr;
    return String(years[0]);
  }, [activeYearStr, years]);

  // --- form ---
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Ischema>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      direction: safeDirection as any, // stored as lowercase string
      year: safeYear as any, // stored as string
    },
  });

  // Reset once when options become ready (avoid overwriting user's later input)
  const initialized = useRef(false);
  useEffect(() => {
    if (!isReady) return;
    if (initialized.current) return;
    initialized.current = true;

    reset({
      direction: safeDirection as any,
      year: safeYear as any,
    });
  }, [isReady, reset, safeDirection, safeYear]);

  // Sync form → redux (optional but you asked active stores current selection)
  const watchedDirection = useWatch({ control, name: "direction" });
  const watchedYear = useWatch({ control, name: "year" });

  useEffect(() => {
    if (!isReady) return;

    const dir = normalizeValue(watchedDirection);
    const yrStr = String(watchedYear ?? "").trim();

    if (!dir || !yrStr) return;
    if (!directions.includes(dir)) return;
    if (!years.map(String).includes(yrStr)) return;

    dispatch(
      setActiveDirection({
        direction: dir, // lowercase stored
        year: Number(yrStr), // number stored
      })
    );
  }, [watchedDirection, watchedYear, isReady, dispatch, directions, years]);

  // Submit
  const onSubmit = async (data: Ischema) => {
    const payload = {
      direction: normalizeValue((data as any).direction),
      year: Number(String((data as any).year)),
    };

    try {
      await dispatch(
        fetchPlans({ ...payload, day: new Date().toISOString().split("T")[0] })
      );

      router.push(`upsl/plan`);
    } catch (e) {
      console.error("fetchPlans failed", e);
    }
  };

  // Skeleton (stable layout)

  if (!isReady) {
    return (
      <div className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg px-4 sm:px-0 mt-12 space-y-4">
        <div className="h-10 rounded-md border bg-muted/40" />
        <div className="h-10 rounded-md border bg-muted/40" />
        <div className="h-10 rounded-md border bg-muted/40" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg sm:px-0
        mt-12
        space-y-2
        text-sm md:text-base
      "
    >
      {/* Rok */}
      <div className="space-y-1">
        <label
          htmlFor="year"
          className="block text-xs font-medium text-muted-foreground"
        >
          Rok studiów
        </label>

        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <Select
              value={String(field.value)}
              onValueChange={(v) => field.onChange(Number(v))}
            >
              <SelectTrigger
                id="year"
                className="h-10 w-full rounded-md border px-3 text-sm focus:ring-2 focus:ring-primary/40"
              >
                <SelectValue placeholder="Wybierz rok" />
              </SelectTrigger>

              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <div className="min-h-[16px]">
          {errors.year && (
            <p className="text-xs text-red-500">
              {String(errors.year.message)}
            </p>
          )}
        </div>
      </div>

      {/* Kierunek */}
      <div className="space-y-1">
        <label
          htmlFor="direction"
          className="block text-xs font-medium text-muted-foreground"
        >
          Kierunek studiów
        </label>

        <Controller
          name="direction"
          control={control}
          render={({ field }) => (
            <Select
              value={normalizeValue(field.value)}
              onValueChange={(v) => field.onChange(normalizeValue(v))}
            >
              <SelectTrigger
                id="direction"
                className="h-10 w-full rounded-md border px-3 text-sm focus:ring-2 focus:ring-primary/40"
              >
                <SelectValue placeholder="Wybierz kierunek" />
              </SelectTrigger>

              <SelectContent>
                {directions.map((val) => (
                  <SelectItem key={val} value={val}>
                    {toLabel(val)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <div className="min-h-[16px]">
          {errors.direction && (
            <p className="text-xs text-red-500">
              {String(errors.direction.message)}
            </p>
          )}
        </div>
      </div>

      <div className="min-h-[16px]">
        {plansError && (
          <p className="text-xs text-red-500">{String(plansError)}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          type="button"
          variant="outline"
          disabled={isSubmitting}
          className="w-full sm:w-1/2 h-10"
          onClick={() => {
            // TODO: open donate modal / route
          }}
        >
          Support us
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-1/2 h-10 set-button-bg set-unprimary-color"
        >
          {isSubmitting ? "Szukam..." : "Znajdź"}
        </Button>
      </div>
    </form>
  );
}
