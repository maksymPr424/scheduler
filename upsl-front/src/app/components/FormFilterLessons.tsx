import React from "react";
import { useDispatch, useSelector } from "react-redux";
import filters from "../../../filters.json";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import {
  selectActiveFilters,
  selectError,
  selectLoading,
} from "@/features/filter/filterSelectors";
import { setActiveGroups } from "@/features/filter/filterSlice";

export default function FormFilterLessons({
  children,
}: {
  children?: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleRadioChange = (
    filterOptions: { json_groups_to_include: string[] }[],
    selectedGroups: string[]
  ) => {
    const next = new Set(activeFilters);

    filterOptions.forEach((opt) => {
      opt.json_groups_to_include.forEach((group) => {
        next.delete(group);
      });
    });

    selectedGroups.forEach((group) => next.add(group));

    dispatch(setActiveGroups(Array.from(next)));
  };

  return (
    <div className="w-full">
      {/* <Accordion type="single" collapsible className="w-full "> */}
      <AccordionItem value="filters">
        <AccordionTrigger className="text-base font-medium m-0 py-2 set-color-svg">
          Filtry
        </AccordionTrigger>
        {filters.map((filter) => {
          const activeOption = filter.options.find((option) =>
            option.json_groups_to_include.every((g) =>
              activeFilters.includes(g)
            )
          );

          return (
            <AccordionContent key={filter.id}>
              <div className="flex w-full max-w-md flex-col gap-3 rounded-xl set-lesson-bg border-separate ">
                <Item variant="outline" className=" border-0">
                  <ItemContent>
                    <ItemTitle className="text-lg set-primary-color mb-3">
                      {filter.name}
                    </ItemTitle>

                    <RadioGroup
                      value={activeOption?.id?.toString()}
                      onValueChange={(value) => {
                        const selected = filter.options.find(
                          (opt) => opt.id.toString() === value
                        );

                        if (selected) {
                          handleRadioChange(
                            filter.options,
                            selected.json_groups_to_include
                          );
                        }
                      }}
                      className="flex flex-col gap-2"
                    >
                      {filter.options.map((option) => {
                        const isChecked = activeOption?.id === option.id;

                        return (
                          <Label
                            key={option.id}
                            htmlFor={`option-${option.id}`}
                            className={`
                                cursor-pointer
                                set-background-day 
                                flex items-center justify-between
                                px-4 py-2 rounded-lg 
                                transition text-sm
                                set-primary-color
                                
                                ${
                                  isChecked
                                    ? "set-border-blue set-lesson-bg "
                                    : "text-muted-foreground hover:bg-muted/70"
                                }
                              `}
                          >
                            <RadioGroupItem
                              value={option.id.toString()}
                              id={`option-${option.id}`}
                              className="hidden"
                            />

                            <span>{option.name}</span>

                            {isChecked && (
                              <span className="text-xs opacity-70">●</span>
                            )}
                          </Label>
                        );
                      })}
                    </RadioGroup>
                  </ItemContent>
                </Item>
              </div>
            </AccordionContent>
          );
        })}
      </AccordionItem>
      {/* <Agent></Agent> */}
      {/* </Accordion> */}

      <div>{children}</div>

      {error && <p className="text-red-500 text-xs mt-2">Error: {error}</p>}
      {loading && <p className="text-gray-400 text-xs mt-2">Loading...</p>}
    </div>
  );
}
