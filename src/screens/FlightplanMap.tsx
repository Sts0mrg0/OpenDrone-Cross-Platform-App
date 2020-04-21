import React, { Component } from "react";
import { View, Text, StyleSheet, PermissionsAndroid, AsyncStorage } from "react-native";
import Map from "../components/Map";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import { IFlightplan } from "../models/IFlightplan";
import { IWaypoint } from "../models/IWaypoint";
import YellowMarker from "../components/map/YellowMarker";
import colors from "../colors";
import FlightPlanDetailTopBtn from "../components/FlightPlanDetailTopBtn";
import { Fonts } from "../fonts";
import { FLIGHTPLANS } from "../utils/StorageCodes";

interface Props {
  navigation: {
    getParam(key: string, defValue?): {};
    goBack();
    navigate(path: string, params: {}): {};
  };
}

interface State {
  waypoints: IWaypoint[];
  isCreating: boolean;
  userLocation: LatLng;
}

const DEFAULT_LOCATION = {
  latitude: 48.3209538,
  longitude: 14.5838411,
};

class FlightplanMap extends Component<Props, State> {
  mapView: Map | null = null;
  static navigationOptions = {
    header: null,
  };

  constructor(props: Props) {
    super(props);

    const { navigation } = this.props;
    let waypoints = navigation.getParam("waypoints", [{}]) as IWaypoint[];
    const isCreating = waypoints.length <= 0;
    this.state = {
      waypoints: waypoints,
      isCreating: isCreating,
      userLocation: DEFAULT_LOCATION,
    };
  }

  render() {
    let firstCoord: LatLng;
    if (this.state.waypoints.length <= 0) {
      firstCoord = this.state.userLocation;
    } else {
      firstCoord = this.state.waypoints[0].location;
    }

    return (
      <View style={styles.container}>
        <View style={styles.topLeftBtnContainer}>
          <FlightPlanDetailTopBtn text="back" onPress={() => this.onBackPressed()} style={{ marginLeft: 20 }} />
        </View>
        {this.state.isCreating && this.state.waypoints.length >= 2 && (
          <View style={styles.bottomRightContainer}>
            <FlightPlanDetailTopBtn text="next" onPress={() => this.onNextPressed()} style={{ margin: 20 }} />
          </View>
        )}
        {!!firstCoord && (
          <Map
            style={{ width: "100%", height: "100%" }}
            latitude={firstCoord.latitude}
            longitude={firstCoord.longitude}
            ref={(c) => (this.mapView = c)}
            onPress={(event) => this.addMarker(event.nativeEvent.coordinate)}
          >
            {this.state.waypoints.length > 0 &&
              this.state.waypoints.map((waypoint, index) => (
                <YellowMarker key={Date.now()} coordinate={waypoint.location} />
              ))}
            {this.state.waypoints.length > 0 && (
              <Polyline
                coordinates={this.state.waypoints.map((waypoint) => waypoint.location)}
                strokeColor={colors.primaryColor}
                strokeWidth={4}
              />
            )}
          </Map>
        )}
      </View>
    );
  }

  addMarker(location: LatLng) {
    if (!this.state.isCreating) {
      return;
    }
    const waypoint: IWaypoint = { location: location };
    const waypoints = this.state.waypoints;
    waypoints.push(waypoint);
    this.setState({ waypoints: waypoints });
  }

  onNextPressed() {
    const flightplan: IFlightplan = {
      id: `${Date.now()}`,
      name: "Flightplan",
      description: "my amazing flightplan",
      waypoints: this.state.waypoints,
    };
    this.props.navigation.navigate("FlightplanDetails", {
      flightplan: flightplan,
      isCreating: true,
    });
  }

  onBackPressed = () => {
    this.props.navigation.goBack();
  };

  animateToCoords(coordinates: LatLng) {
    if (this.mapView) {
      this.mapView.animateToCoordinate(coordinates);
    }
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "OpenDrone braucht deine Position",
        message: "Um OpenDrone in vollem Umfang benutzen zu können, benötigen wir deine Position",
        buttonNeutral: "Später",
        buttonNegative: "Abbrechen",
        buttonPositive: "OK",
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getUserPosition();
      } else {
        this.animateToCoords(this.state.userLocation);
      }
    } catch (err) {
      this.animateToCoords(this.state.userLocation);
    }
  }

  getUserPosition() {
    navigator.geolocation.requestAuthorization();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        /*const userLocation: LatLng = position.coords;
                this.setState({ userLocation });
                this.animateToCoords(userLocation);*/
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    navigator.geolocation.watchPosition(
      (position) => {
        /*const userLocation: LatLng = position.coords;
                this.setState({ userLocation });*/
      },
      (error) => console.log(error)
    );
  }
}
export default FlightplanMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topLeftBtnContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
    flex: 1,
    zIndex: 4,
    elevation: 4,
  },
  bottomRightContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    right: 0,
    flex: 1,
    zIndex: 4,
    elevation: 4,
  },
});
