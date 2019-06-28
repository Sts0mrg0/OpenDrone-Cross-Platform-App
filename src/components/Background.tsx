import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import colors from '../colors';

const globalWidth = Math.round(Dimensions.get('window').width);
const globalHeight = Math.round(Dimensions.get('window').height);
class Background extends Component {
  render() {
    return (
      <RadialGradient
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute'
        }}
        colors={['white', colors.fadedYellow]}
        stops={[0.75]}
        center={[globalWidth / 2, globalHeight / 2]}
        radius={800}
      />
    );
  }
}
export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
