type LessonType = "Wyklad" | "CL" | "Konwersatorium" | "AU";

export interface ILesson {
  time_start: string;
  time_end: string;
  subject: string;
  lessonType: LessonType;
  teacher: string;
  auditory: string;
  groups: string;
  trackNumber: number;
}

export interface IDay {
  day: string;
  lessons: ILesson[];
}

export interface IPlan {
  schedules: IDay[];
  id: string;
}

export interface IPlanState {
  plans: IDay[] | [];
  id: string | null;
  loading: boolean;
  error: string | null;
}

export interface IPayloadPlan {
  payload: IPlan;
}

export type MajorType = "" | "Informatyka";

export type YearType = "" | "I" | "II" | "III" |  "IV";

export interface IMajorState {
  major: MajorType;
  year: YearType;
}

export interface IPlanById extends IPlan {
  metaData: IMajorState;
}
