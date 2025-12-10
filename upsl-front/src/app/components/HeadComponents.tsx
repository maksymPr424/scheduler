import { Accordion } from "@radix-ui/react-accordion";
import FormFilterLessons from "./FormFilterLessons";
import Agent from "./Agent";

export default function HeadComponents() {
  return (
    <Accordion type="single" collapsible className="w-full gap-0">
      <FormFilterLessons />
      <Agent />
    </Accordion>
  );
}
