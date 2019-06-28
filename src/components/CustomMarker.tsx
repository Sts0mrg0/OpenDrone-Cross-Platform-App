import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../colors';
import { Fonts } from '../fonts';

interface Props {
  text?: string;
}

interface State {}

class CustomMarker extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.text ? this.props.text : ``}
        </Text>
      </View>
    );
  }
}
export default CustomMarker;

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: Fonts.Roboto.medium,
    fontSize: 12,
    color: colors.almostWhite,
    elevation: 4
  }
});
