import { IWaypoint } from "./IWaypoint";

export interface IFlightplan {
  name: string;
  description?: string;
  waypoints: IWaypoint[];
}
