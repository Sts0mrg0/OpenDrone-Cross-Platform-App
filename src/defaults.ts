import { LatLng, Region } from 'react-native-maps';

export const DEFAULT_LATITUDE = 48.2341661;
export const DEFAULT_LONGITUDE = 14.6472589;
export const DEFAULT_LATLNG: LatLng = {
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE
};
export const DEFAULT_REGION: Region = {
  ...DEFAULT_LATLNG,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5
};
