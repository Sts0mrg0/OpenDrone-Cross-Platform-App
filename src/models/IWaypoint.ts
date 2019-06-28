import { ILocation } from './ILocation';
import { LatLng } from 'react-native-maps';

export interface IWaypoint {
  location: LatLng;
  alitude?: number;
  function?: string;
}
