import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, {
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile,
  MapEvent
} from 'react-native-maps';
interface Props {
  provider?: any;
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  style?: {};
  onPress?(event: MapEvent): any;
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
const DEFAULT_LATITUDE_DELTA = 0.0922;
const DEFAULT_LONGITUDE_DELTA = DEFAULT_LATITUDE_DELTA * ASPECT_RATIO;

class Map extends React.Component<Props, State> {
  mapView: MapView;
  constructor(props: Props) {
    super(props);
    const lat = this.props.latitude;
    const lng = this.props.longitude;
    const latDelta = this.props.latitudeDelta
      ? this.props.latitudeDelta
      : DEFAULT_LATITUDE_DELTA;
    const lngDelta = this.props.longitudeDelta
      ? this.props.longitudeDelta
      : DEFAULT_LONGITUDE_DELTA;
    this.state = {
      region: {
        latitude: lat,
        longitude: lng,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta
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
    console.log(this.state.region);
    return (
      <MapView
        ref={(c) => (this.mapView = c)}
        initialRegion={this.state.region}
        provider={null}
        mapType={this.mapType}
        rotateEnabled={false}
        style={[styles.map, this.props.style]}
        showsUserLocation
        onMapReady={this.onMapLayout}
        onPress={
          this.props.onPress
            ? (event) => this.props.onPress(event)
            : (event) => {
                console.log(event.nativeEvent.coordinate);
              }
        }
      >
        <UrlTile
          urlTemplate='http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
          maximumZ={19}
        />
        {this.props.children}
      </MapView>
    );
  }
}
export default Map;

const styles = StyleSheet.create({
  map: {
    height: '125%',
    width: '125%',
    flex: 1,
    position: 'absolute'
  }
});
