import { AccordionContent } from "@/components/ui/accordion";
import DayItem from "./DayItem";
import { ILesson } from "@/interfaces/planInterfaces";

interface IPlanItem {
  lessons: ILesson[];
}

export default function PlanItem({ lessons }: IPlanItem) {
  return (
    <>
      {lessons.map((lesson, i) => (
        // <AccordionContent key={i}>
        <DayItem lesson={lesson} key={i} />
        // </AccordionContent>
      ))}
    </>
  );
}
