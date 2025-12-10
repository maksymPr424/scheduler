import * as Yup from "yup";

export const schema = Yup.object().shape({
  year: Yup.string()
    .max(1, "Rok nie może być powyżej 4")
    .required("Musisz zaznaczyć rok stódiów"),
  major: Yup.string()
    .min(1, "Kierunek nie może być pusty")
    .required("Musisz zaznaczyć kierunek stódiów"),
});

export interface Ischema {
  year: string;
  major: string;
}
