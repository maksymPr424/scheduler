import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@/components/ui/item";
import { ILesson } from "@/interfaces/planInterfaces";
import { backSet, colorSet, colSet, shortSet } from "@/utils/constants";
import CustomIcon from "./CustomIcon";

interface IDayItem {
  lesson: ILesson;
}

export default function DayItem({ lesson }: IDayItem) {
  return (
    <>
      <Item
        variant="outline"
        asChild
        role="listitem"
        className={`${colorSet[lesson.lessonType]} rounded-2xl set-lesson-bg`}
      >
        <a href="#">
          <ItemDescription className="flex flex-col gap-1 items-start max-w-17 wrap-anywhere">
            <span
              className={` ${
                backSet[lesson.lessonType]
              } set-unprimary-color text-center w-7 h-5 rounded-sm font-semibold text-sm`}
            >
              {shortSet[lesson.lessonType]}
            </span>

            <span className="flex flex-col gap-1">
              <span
                // className={`${colSet[lesson.lessonType]} font-bold text-xl`}
                className="set-primary-color font-semibold text-2xl"
              >
                {lesson.time_start}
              </span>
              <span
                className={`${colSet[lesson.lessonType]} font-bold text-xl`}
                // className={`${colSet[lesson.lessonType]} font-bold text-xl`}
              >
                {lesson.time_end}
              </span>
            </span>

            {/* <span className="set-secondary-color font-bold flex gap-2 items-center">
              <span className="set-secondary-color">{lesson.groups}</span>
            </span> */}
          </ItemDescription>
          <ItemContent className="flex flex-col flex-1 justify-between gap-3 size-full">
            <ItemTitle className="min-h-fit text-lg font-semibold">
              {lesson.subject}
            </ItemTitle>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <ItemDescription className="set-secondary-color font-medium flex gap-2 items-center">
                  <CustomIcon
                    id="icon-speaker"
                    className="set-day-svg-fill set-day-size"
                  ></CustomIcon>
                  <span className="set-secondary-color">{lesson.teacher}</span>
                </ItemDescription>
              </div>
              <ItemFooter className="flex gap-2 items-center justify-start">
                <CustomIcon
                  id="icon-place"
                  className="set-day-svg-stroke set-day-size "
                ></CustomIcon>
                <span className="set-secondary-color font-semibold">
                  {lesson.auditory}
                </span>
              </ItemFooter>
            </div>
          </ItemContent>
        </a>
      </Item>
    </>
  );
}
