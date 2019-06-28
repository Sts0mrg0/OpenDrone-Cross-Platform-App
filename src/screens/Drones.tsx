import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Map from '../components/Map';

class Drones extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Map />
      </View>
    );
  }
}
export default Drones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
