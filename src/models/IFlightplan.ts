import { IWaypoint } from "./IWaypoint";

export interface IFlightplan {
  id: string;
  name: string;
  description?: string;
  waypoints: IWaypoint[];
}
