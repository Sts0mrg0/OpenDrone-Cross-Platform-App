import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Map from "../components/Map";
import { LatLng, Marker, Polyline } from "react-native-maps";
import { IFlightplan } from "../models/IFlightplan";
import { IWaypoint } from "../models/IWaypoint";
import YellowMarker from "../components/map/YellowMarker";
import colors from "../colors";
import FlightPlanDetailTopBtn from "../components/FlightPlanDetailTopBtn";
import { Fonts } from "../fonts";

interface Props {
  navigation: {
    getParam(key: string, defValue?): {};
    goBack();
    navigate(path: string, params: {}): {};
  };
}

interface State {
  waypoints: IWaypoint[];
}

class FlightplanMap extends Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  constructor(props: Props) {
    super(props);

    const { navigation } = this.props;
    const waypoints = navigation.getParam("waypoints", {}) as IWaypoint[];
    this.state = {
      waypoints: waypoints
    };
  }

  render() {
    const firstCoord = this.state.waypoints[0].location;
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View
          style={{
            position: "absolute",
            width: "100%",
            top: 0,
            flex: 1,
            zIndex: 4,
            elevation: 4
          }}
        >
          <FlightPlanDetailTopBtn text="back" onPress={() => goBack()} style={{ marginLeft: 20 }} />
        </View>
        {!!firstCoord && (
          <Map
            style={{ width: "100%", height: "100%" }}
            latitude={firstCoord.latitude}
            longitude={firstCoord.longitude}
          >
            {this.state.waypoints.length > 0 &&
              this.state.waypoints.map(waypoint => <YellowMarker coordinate={waypoint.location} />)}
            <Polyline
              coordinates={this.state.waypoints.map(waypoint => waypoint.location)}
              strokeColor={colors.primaryColor}
              strokeWidth={4}
            />
          </Map>
        )}
      </View>
    );
  }

  onBackPressed = () => {};
}
export default FlightplanMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
