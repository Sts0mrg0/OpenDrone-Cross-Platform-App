import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import colors from "../colors";
import { Fonts } from "../fonts";
import Icon from "react-native-vector-icons/Ionicons";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Thanks for using OpenDrone! 🙌</Text>
        <Text style={styles.socialMediaHeading}>Feel free to follow us on our social medias</Text>
        <View style={styles.socialMediasContainer}>
          <TouchableOpacity
            style={styles.socialMediaIcon}
            onPress={() => this.openURL("https://www.instagram.com/opendroneat")}
          >
            <Icon name="logo-instagram" size={40} color={colors.primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialMediaIcon}
            onPress={() => this.openURL("https://www.twitter.com/opendroneat")}
          >
            <Icon name="logo-twitter" size={40} color={colors.primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialMediaIcon}
            onPress={() => this.openURL("https://www.github.com/opendroneat")}
          >
            <Icon name="logo-github" size={40} color={colors.primaryColor} />
          </TouchableOpacity>
        </View>

        <Text style={styles.nextStepsHeading}>Next steps: </Text>
        <Text style={styles.nextStep}>
          You can customize your amazing drone in the "My Drone" tab (give it a fancy new name and stuff)
        </Text>
        <Text style={styles.nextStep}>
          Wanna create a flightplan? No problem, simply navigate to "Flightplans" and do so
        </Text>
        <Text style={styles.nextStep}>
          To fly, just tap on the plane button below (yeah a plane, not a drone), press ARM and take off🚀
        </Text>
      </View>
    );
  }

  openURL(url: string) {
    Linking.openURL(url);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
  },
  instructions: {
    textAlign: "center",
    color: colors.notQuiteBlack,
    fontFamily: Fonts.Roboto.bold,
    fontSize: 20,
    margin: 5,
    marginTop: 20,
  },
  socialMediaHeading: {
    fontFamily: Fonts.Roboto.medium,
    color: colors.notQuiteBlack,
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    marginTop: 20,
  },
  socialMediasContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialMediaIcon: {
    margin: 10,
  },
  nextStepsHeading: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    fontFamily: Fonts.Roboto.bold,
    color: colors.notQuiteBlack,
    fontSize: 16,
  },
  nextStep: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    fontFamily: Fonts.Roboto.medium,
    color: colors.notQuiteBlack,
  },
});
