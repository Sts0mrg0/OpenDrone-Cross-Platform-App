import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IFlightplan } from '../models/IFlightplan';
import { Fonts } from '../fonts';

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

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          height: '100%'
        }}
        onPress={() =>
          this.props.navigation.navigate('FlightplanDetails', {
            flightplan: flightplan
          })
        }
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>{flightplan.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
export default SingleFlightplan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 1
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontFamily: Fonts.Roboto.bold
  }
});
