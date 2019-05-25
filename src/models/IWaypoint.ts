import { ILocation } from "./ILocation";

export interface IWaypoint {
  location: ILocation;
  alitude?: number;
  function?: string;
}
