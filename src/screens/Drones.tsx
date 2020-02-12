import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import Map from "../components/Map";
import { Fonts } from "../fonts";
import colors from "../colors";
import { TouchableOpacity } from "react-native-gesture-handler";

class Drones extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/ee/86/cb/ee86cbbbf5645399414c6c128d2742e5.png"
          }}
          style={{ width: "100%", height: 150 }}
          resizeMode="cover"
        />
        <TextInput
          placeholder="Name"
          style={{ fontFamily: Fonts.Roboto.bold, fontSize: 32, color: colors.notQuiteBlack }}
        />
        <TouchableOpacity>
          <Text style={{ fontFamily: Fonts.Roboto.bold, color: colors.notQuiteBlack, margin: 10 }}>CALIBRATE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Drones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
