/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createNavigator
} from "react-navigation";

import Icon from "react-native-vector-icons/Ionicons";
import Home from "./src/screens/Home";
import Drones from "./src/screens/Drones";
import Flightplans from "./src/screens/Flightplans";
import Fly from "./src/screens/Fly";
import Settings from "./src/screens/Settings";
import colors from "./src/colors";
console.disableYellowBox = true;

interface Props {}

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "HOME",
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-planet' color={tintColor} size={24} />
        )
      }
    },
    Flightplans: {
      screen: Flightplans,
      navigationOptions: {
        tabBarLabel: "FLIGHTPLANS",
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-map' color={tintColor} size={24} />
        )
      }
    },
    Fly: {
      screen: Fly,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ tintColor }) => (
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 100,
              backgroundColor: tintColor,
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <Icon name='md-jet' size={45} color='#fafafa' />
          </View>
        )
      }
    },
    Drones: {
      screen: Drones,
      navigationOptions: {
        tabBarLabel: "DRONES",
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-apps' color={tintColor} size={24} />
        )
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: "SETTINGS",
        tabBarIcon: ({ tintColor }) => (
          <Icon name='md-settings' color={tintColor} size={24} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colors.primaryColor,
      inactiveTintColor: colors.secondaryColor,
      style: {
        backgroundColor: colors.almostWhite,
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  }
);

const AppContainer = createAppContainer(TabNavigator);
export default AppContainer;
