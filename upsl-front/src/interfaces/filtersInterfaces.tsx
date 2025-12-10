export interface IFilterOprion {
  name: string;
  id: number;
  json_groups_to_include: string[];
}

export interface IFilter {
  name: string;
  id: number;
  options: IFilterOprion[];
}

export interface IFiltersState {
  filters: IFilter[] | [];
  active: string[] | [];
  loading: boolean;
  error: string | null;
}

export interface IFetchFiltersProps {
  id: string;
}

export interface IFilterPayload {
  payload: IFilter[] | [];
}
