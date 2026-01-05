import * as Yup from "yup";

export const schema = Yup.object({
  year: Yup.number()
    .min(1, "Rok musi być ≥ 1")
    .max(4, "Rok nie może być powyżej 4")
    .required("Musisz zaznaczyć rok studiów"),

  direction: Yup.string()
    .min(1, "Kierunek nie może być pusty")
    .required("Musisz zaznaczyć kierunek studiów"),
});

export interface Ischema {
  year: number;
  direction: string;
}

export interface IFetchPlanForm extends Ischema {
  day: string;
}
