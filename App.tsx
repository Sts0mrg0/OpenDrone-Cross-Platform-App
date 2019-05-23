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
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  BottomTabBar
} from "react-navigation";
import Home from "./src/screens/Home";
interface Props {}

const TabBarComponent = (props: Props) => <BottomTabBar {...props} />;

const TabScreens = createBottomTabNavigator({
  tabBarComponent: (props: Props) => (
    <TabBarComponent {...props} style={{ borderTopColor: "#605F60" }} />
  )
});

export default class App extends Component<Props> {
  render() {
    return <View />;
  }
}
