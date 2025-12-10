"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { fetchPlans } from "../../features/plans/planThunks";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, Ischema } from "../validations/searchPlanValidation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { IPayloadPlan } from "@/interfaces/planInterfaces";
import { setMajorData } from "@/features/major/majorSlice";
import { useSelector } from "react-redux";
import { selectMajor, selectYear } from "@/features/major/majorSelectors";

const years = [3];
const majors = ["Informatyka"];

export default function FormSearchPlan() {
  const dispatch = useAppDispatch();
  const { plans, loading, error } = useAppSelector((state) => state.plans);
  const router = useRouter();
  const major = useSelector(selectMajor);
  const year = useSelector(selectYear);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Ischema>({
    resolver: yupResolver(schema),
    defaultValues: {
      year: year,
      major: major,
    },
  });

  const watchedYear = useWatch({ control, name: "year" });
  const watchedMajor = useWatch({ control, name: "major" });

  useEffect(() => {
    if (watchedYear && watchedMajor) {
      console.log("Значення змінились:", {
        year: watchedYear,
        major: watchedMajor,
      });
      dispatch(setMajorData({ year: watchedYear, major: watchedMajor }));
    }
  }, [watchedYear, watchedMajor, dispatch]);

  const onSubmit = async (data: Ischema) => {
    // dispatch(setMajorData(data));
    const { payload }: IPayloadPlan = await dispatch(fetchPlans({ ...data }));
    router.push(`/plan/${payload.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-1 max-w-md mt-13 mx-auto text-sm md:text-base lg:text-lg"
    >
      {/* Select Rok studiów */}
      <div className="relative pb-5">
        <label htmlFor="year" className="text-sm">
          Rok studiów
        </label>
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Wybierz rok" />
              </SelectTrigger>
              <SelectContent>
                {years.map((item, index) => (
                  <SelectItem key={index} value={item.toString()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.year && (
          <p className="text-red-500 text-xs mt-1 absolute bottom-0 left-0">
            {errors.year.message}
          </p>
        )}
      </div>

      {/* Select Kierunek studiów */}
      <div className="relative pb-5">
        <label htmlFor="major" className="text-sm">
          Kierunek studiów
        </label>
        <Controller
          name="major"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                <SelectValue
                  className="set-secondary-color "
                  placeholder="Wybierz kierunek"
                />
              </SelectTrigger>
              <SelectContent>
                {majors.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.major && (
          <p className="text-red-500 text-xs mt-1 absolute bottom-0 left-0">
            {errors.major.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4 relative">
        <div className="flex-1">
          <Button
            type="submit"
            variant="outline"
            disabled={isSubmitting}
            className="max-w-full w-full"
          >
            Support us
          </Button>
        </div>
        <div className="flex-1">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full set-button-bg set-unprimary-color"
          >
            {isSubmitting ? "Szukam..." : "Znajdź"}
          </Button>
        </div>
      </div>
    </form>
  );
}
