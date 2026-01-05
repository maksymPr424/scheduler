export interface IFilterOprion {
  name: string;
  id: number;
  groups: string[];
}

export interface IFilter {
  name: string;
  id: number;
  options: IFilterOprion[];
}

export interface IFiltersState {
  filters: IFilter[];
  active: string[];
  loading: boolean;
  error: string | null;
}

export interface IFetchFiltersProps {
  direction: string;
  year: number;
}

export interface IFilterPayload {
  payload: IFilter[] | [];
}
