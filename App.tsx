/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createNavigator
} from 'react-navigation';
import {
  fromLeft,
  zoomIn,
  fromBottom,
  fromRight,
  fromTop
} from 'react-navigation-transitions';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './src/screens/Home';
import Drones from './src/screens/Drones';
import Flightplans from './src/screens/Flightplans';
import Fly from './src/screens/Fly';
import Settings from './src/screens/Settings';
import colors from './src/colors';
import FlightplanDetails from './src/screens/FlightplanDetails';
console.disableYellowBox = true;

interface Props {}

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'HOME',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-planet' color={tintColor} size={24} />
        )
      }
    },
    Flightplans: {
      screen: Flightplans,
      navigationOptions: {
        tabBarLabel: 'FLIGHTPLANS',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-map' color={tintColor} size={24} />
        )
      }
    },
    Fly: {
      screen: Fly,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: ({ tintColor }) => (
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 100,
              backgroundColor: colors.almostWhite,
              justifyContent: 'space-around',
              alignItems: 'center',
              elevation: 4
            }}
          >
            <Icon name='md-jet' size={40} color={tintColor} />
          </View>
        )
      }
    },
    Drones: {
      screen: Drones,
      navigationOptions: {
        tabBarLabel: 'DRONES',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-apps' color={tintColor} size={24} />
        )
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: 'SETTINGS',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-settings' color={tintColor} size={24} />
        )
      }
    }
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: colors.primaryColor,
      inactiveTintColor: colors.secondaryColor,
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  }
);

const StackNavigator = createStackNavigator(
  {
    Tabbar: {
      screen: TabNavigator,
      navigationOptions: {
        title: 'OpenDrone',
        header: null
      }
    },
    FlightplanDetails: {
      screen: FlightplanDetails
    }
  },
  {
    headerMode: 'screen',
    transitionConfig: (nav) => handleCustomTransitionStackNav(nav)
  }
);

const handleCustomTransitionStackNav = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (
    prevScene &&
    prevScene.route.routeName === 'Tabbar' &&
    nextScene.route.routeName === 'FlightplanDetails'
  ) {
    return fromBottom(500);
  }
  return fromBottom();
};

const AppContainer = createAppContainer(StackNavigator);
export default AppContainer;
