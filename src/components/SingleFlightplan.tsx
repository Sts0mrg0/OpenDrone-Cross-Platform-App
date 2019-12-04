import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IFlightplan } from "../models/IFlightplan";
import { Fonts } from "../fonts";
import Map from "./Map";
import YellowMarker from "./map/YellowMarker";
import { Polyline } from "react-native-maps";
import colors from "../colors";

interface Props {
  flightplan: IFlightplan;
  navigation: {
    navigate(string, {});
  };
}
interface State {}
class SingleFlightplan extends Component<Props, State> {
  render() {
    const flightplan = this.props.flightplan;
    const firstWaypoint = flightplan.waypoints[0];
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[{ height: "100%", padding: 0, margin: 0 }]}
        onPress={() =>
          this.props.navigation.navigate("FlightplanDetails", {
            flightplan: flightplan
          })
        }
      >
        <View style={styles.container}>
          <View style={{ maxWidth: "100%", flex: 1, position: "relative", overflow: "hidden", borderRadius: 5 }}>
            <Map
              style={{ maxWidth: "100%", flex: 1, position: "relative" }}
              latitude={firstWaypoint.location.latitude}
              longitude={firstWaypoint.location.longitude}
              liteMode={true}
            >
              {flightplan.waypoints.map((waypoint, index) => (
                <YellowMarker key={index} coordinate={waypoint.location} />
              ))}
              <Polyline
                coordinates={flightplan.waypoints.map(waypoint => waypoint.location)}
                strokeColor={colors.primaryColor}
                strokeWidth={4}
              />
            </Map>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {flightplan.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default SingleFlightplan;

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    flexDirection: "column",
    height: 200,
    padding: 0,
    margin: 0
  },
  textContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: 50,
    maxHeight: 50,
    position: "relative",
    flexDirection: "column"
  },
  text: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    maxHeight: 50,
    fontFamily: Fonts.Roboto.bold
  }
});
