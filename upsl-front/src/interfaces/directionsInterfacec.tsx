export interface IDirections {
  directions: string[];
  years: number[];
}

export interface IActiveDirection {
  direction: string;
  year: number;
}

export interface IDirectionsState extends IDirections {
    active: IActiveDirection | null;
}

export interface IDirectionsPayload {
  payload: IDirections;
}