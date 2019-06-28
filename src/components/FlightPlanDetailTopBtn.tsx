import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Fonts } from '../fonts';

interface Props {
  text: string;
  onPress(): any;
}

interface State {}

class FlightPlanDetailTopBtn extends Component<Props, State> {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => this.props.onPress()}
      >
        <View style={[styles.btn]}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
export default FlightPlanDetailTopBtn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    marginTop: 20,
    paddingHorizontal: 5,
    width: 60,
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    elevation: 4,
    marginLeft: 10
  },
  text: {
    textTransform: 'uppercase',
    fontFamily: Fonts.Roboto.black,
    color: 'black',
    fontSize: 12
  }
});
