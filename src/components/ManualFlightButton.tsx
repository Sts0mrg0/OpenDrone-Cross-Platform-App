import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../colors';
import { Fonts } from '../fonts';

interface Props {
  onPress(): any;
  text: string;
  style: {};
  iconName: string;
}

interface State {}

class ManualFlightButton extends Component<Props, State> {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={this.props.style}
        onPress={() => this.props.onPress()}
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Icon
            name={this.props.iconName}
            size={40}
            color={colors.primaryColor}
          />
          <Text
            style={{
              fontFamily: Fonts.Roboto.bold,
              color: 'black',
              textTransform: 'uppercase',
              fontSize: 10
            }}
          >
            {this.props.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
export default ManualFlightButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
