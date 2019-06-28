import React, { Component } from 'react';
import { View, Dimensions, Text } from 'react-native';
import MapView, {
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile
} from 'react-native-maps';

import MapComponent from '../components/Map';
import RNGamePad from 'react-native-game-pad';
import { Fonts } from '../fonts';

interface Props {
  provider: any;
}
interface State {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  isMapReady?: boolean;
}
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 22.720555;
const LONGITUDE = 75.858633;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const options = {
  color: '#ff0000',
  size: 10
};

class Fly extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  get mapType() {
    return this.props.provider === PROVIDER_DEFAULT
      ? MAP_TYPES.STANDARD
      : MAP_TYPES.NONE;
  }
  render() {
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          padding: 20
        }}
      >
        <Text style={{ fontFamily: Fonts.Roboto.bold, color: '#000000' }}>
          This does not work atm because the repo
          https://github.com/jim-at-jibba/react-native-game-pad does not work!
        </Text>
      </View>
    );
  }
}
export default Fly;

// <MapComponent latitude={LATITUDE} longitude={LONGITUDE} />
