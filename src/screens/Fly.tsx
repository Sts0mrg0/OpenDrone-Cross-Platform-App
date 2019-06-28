import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text,
  WebView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import RNGamePadDual from '../components/game-pad/dual/dual-joystick';
import colors from '../colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../fonts';
import ManualFlightButton from '../components/ManualFlightButton';

interface Props {}
interface State {
  altHoldText: string;
  altHoldIcon: string;
  armText: string;
  armIcon: string;
}
const { width, height } = Dimensions.get('window');

const options = {
  color: colors.primaryColor,
  size: 500
};

class Fly extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      altHoldText: 'ALT HOLD ON',
      altHoldIcon: 'md-arrow-round-up',
      armText: 'ARM',
      armIcon: 'md-sync'
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            padding: 20
          }}
        >
          <RNGamePadDual
            style={{ width: '50%', height: '50%' }}
            options={options}
            options2={options}
            onRightMove={this.handleOnRightMove}
            onLeftMove={this.handleOnLeftMove}
          />
          <View
            style={{
              flexDirection: 'column',
              position: 'absolute',
              top: 80,
              right: -50,
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.Roboto.bold,
                width: 160,
                transform: [{ rotate: '90deg' }],
                color: 'black'
              }}
            >
              Altitude Hold is{' '}
              {this.state.altHoldIcon === 'md-pause' ? 'ON' : 'OFF'}
            </Text>
            <View
              style={{
                width: 15,
                height: 15,
                backgroundColor:
                  this.state.altHoldIcon === 'md-pause' ? '#27ae60' : '#c0392b',
                borderRadius: 15,
                marginTop: 45
              }}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              position: 'absolute',
              marginLeft: 20
            }}
          >
            <ManualFlightButton
              style={{
                transform: [{ rotate: '90deg' }],
                margin: 10,
                width: 70
              }}
              text='HOME'
              onPress={() => {}}
              iconName='md-home'
            />
            <ManualFlightButton
              style={{
                transform: [{ rotate: '90deg' }],
                margin: 10,
                width: 70
              }}
              text={this.state.altHoldText}
              onPress={() => this.hanldeAltHoldPressed()}
              iconName={this.state.altHoldIcon}
            />
            <ManualFlightButton
              style={{
                transform: [{ rotate: '90deg' }],
                margin: 10,
                width: 70
              }}
              text={this.state.armText}
              onPress={() => this.handleArmPressed()}
              iconName={this.state.armIcon}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  handleOnRightMove = (evt, data) => {
    console.log('handleOnRightMove', evt, data);
  };

  handleOnLeftMove = (evt, data) => {
    console.log('handleOnLeftMove', evt, data);
  };

  handleArmPressed = () => {
    if (this.state.armIcon === 'md-sync') {
      this.setState({
        armText: 'STOP',
        armIcon: 'md-hand'
      });
    } else {
      this.setState({
        armText: 'ARM',
        armIcon: 'md-sync'
      });
    }
  };

  hanldeAltHoldPressed = () => {
    if (this.state.altHoldIcon === 'md-arrow-round-up') {
      this.setState({
        altHoldText: 'ALT HOLD OFF',
        altHoldIcon: 'md-pause'
      });
    } else {
      this.setState({
        altHoldText: 'ALT HOLD ON',
        altHoldIcon: 'md-arrow-round-up'
      });
    }
  };
}
export default Fly;

// <MapComponent latitude={LATITUDE} longitude={LONGITUDE} />
