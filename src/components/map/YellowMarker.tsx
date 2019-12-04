import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LatLng, Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../colors";

interface Props {
  coordinate: LatLng;
}

interface State {}

class YellowMarker extends Component<Props, State> {
  render() {
    return (
      <Marker coordinate={this.props.coordinate}>
        <Icon name="md-pin" color={colors.primaryColor} size={24} style={{ marginRight: 10 }} />
      </Marker>
    );
  }
}
export default YellowMarker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
