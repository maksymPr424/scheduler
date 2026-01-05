type LessonType = "Wyklad" | "CL" | "Konwersatorium" | "AU";

export interface ILesson {
  subject: string;
  start: string;
  end: string;
  lesson_type: LessonType;
  teacher: string;
  auditory: string;
  groups: string[];
}

export type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

export interface IDay {
  day: WeekDay;
  date: string;
  lessons: ILesson[];
}

export interface IPlanState {
  plans: IDay[] | [];
  loading: boolean;
  error: string | null;
}

export interface IPayloadPlan {
  payload: IDay[];
}

export type MajorType = "" | "Informatyka";

export type YearType = "" | "I" | "II" | "III" | "IV";

export interface IMajorState {
  major: MajorType;
  year: YearType;
}
