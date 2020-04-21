import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LatLng, Marker, MapEvent } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../colors";

interface Props {
  coordinate: LatLng;
  onDrag?(event: MapEvent): any;
  onDragStart?(event: MapEvent): any;
  onDragEnd?(event: MapEvent): any;
}

interface State {}

class YellowMarker extends Component<Props, State> {
  render() {
    return (
      <Marker
        coordinate={this.props.coordinate}
        draggable={true}
        onDrag={
          this.props.onDrag
            ? (event) => this.props.onDrag(event)
            : (event) => {
                console.log(event.nativeEvent.coordinate);
              }
        }
        onDragStart={
          this.props.onDragStart
            ? (event) => this.props.onDragStart(event)
            : (event) => {
                console.log(event.nativeEvent.coordinate);
              }
        }
        onDragEnd={
          this.props.onDragEnd
            ? (event) => this.props.onDragEnd(event)
            : (event) => {
                console.log(event.nativeEvent.coordinate);
              }
        }
      >
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
    justifyContent: "center",
  },
});
