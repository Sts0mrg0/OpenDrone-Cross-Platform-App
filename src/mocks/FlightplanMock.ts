import { IFlightplan } from "../models/IFlightplan";

export const flightplans: IFlightplan[] = [
  {
    id: "1",
    name: "testasdfasfasdfsdfasfsdafasdfasdfasdasdfsdafsadf",
    description: "this is very awesome because you can fly around",
    waypoints: [
      { location: { latitude: 48.3200011, longitude: 24.5734128 } },
      { location: { latitude: 48.3260011, longitude: 24.5734128 } },
    ],
  },
  {
    id: "2",
    name: "test2",
    description: "home and back. also over a prison. nvm",
    waypoints: [{ location: { latitude: 48.3200011, longitude: 24.5734128 } }],
  },
  {
    id: "3",
    name: "test2",
    description: "over trumps wall from mexico to the states",
    waypoints: [{ location: { latitude: 48.3200011, longitude: 24.5734128 } }],
  },
];
