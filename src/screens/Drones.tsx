import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Drones extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Drones</Text>
      </View>
    );
  }
}
export default Drones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
