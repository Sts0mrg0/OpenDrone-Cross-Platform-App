import { IFlightplan } from '../models/IFlightplan';

export const flightplans: IFlightplan[] = [
  {
    name: 'test',
    description: 'this is very awesome because you can fly around',
    waypoints: [{ location: { latitude: 48.3200011, longitude: 24.5734128 } }]
  },
  {
    name: 'test2',
    description: 'home and back. also over a prison. nvm',
    waypoints: [{ location: { latitude: 48.3200011, longitude: 24.5734128 } }]
  },
  {
    name: 'test2',
    description: 'over trumps wall from mexico to the states',
    waypoints: [{ location: { latitude: 48.3200011, longitude: 24.5734128 } }]
  }
];
