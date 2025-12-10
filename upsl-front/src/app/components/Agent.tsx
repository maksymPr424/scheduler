"uce client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { colorDescriptions, colorSet } from "@/utils/constants";

export default function Agent() {
  return (
    <AccordionItem value="agent">
      <AccordionTrigger className="text-md font-medium m-0 py-2 set-color-svg">
        Agenda po kolorach i typach zajęć
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex w-full max-w-md flex-col gap-6 set-background-day p-3 rounded-2xl">
          {Object.entries(colorSet).map(([key, colorBorder]) => (
            <Item
              variant="outline"
              key={key}
              className={`${colorBorder} set-lesson-bg `}
            >
              <ItemContent>
                <div className="flex gap-4">
                  <ItemTitle className="set-primary-color">{key}</ItemTitle>
                </div>
                <ItemDescription className="w-full text-wrap set-secondary-color ">
                  {colorDescriptions[key]}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
