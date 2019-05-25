import React, { Component } from "react";
import { View, StyleSheet, StatusBar, Image, Dimensions } from "react-native";
import { Button } from "react-native";
import MapView, {
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile
} from "react-native-maps";

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
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 22.720555;
const LONGITUDE = 75.858633;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
      <View style={{ width: "100%", height: "100%" }}>
        <MapView
          region={this.state.region}
          provider={null}
          mapType={this.mapType}
          rotateEnabled={false}
          style={styles.map}
          showsUserLocation
          onMapReady={this.onMapLayout}
        >
          <UrlTile
            urlTemplate='http://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            maximumZ={19}
          />
        </MapView>
      </View>
    );
  }
}
export default Fly;

const styles = StyleSheet.create({
  map: {
    height: 400,
    width: 400,
    flex: 1
  }
});
