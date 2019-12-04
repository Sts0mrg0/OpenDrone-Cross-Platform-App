import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { Fonts } from "../fonts";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../colors";
interface Props {
  text?: string;
  onPress(): any;
  style?: ViewStyle;
  icon?: string;
}

interface State {}

class FlightPlanDetailTopBtn extends Component<Props, State> {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.onPress()}>
        <View style={[styles.btn, this.props.style]}>
          {!!this.props.icon && <Icon name={this.props.icon} color={colors.notQuiteBlack} size={24} />}
          {!!this.props.text && <Text style={styles.text}>{this.props.text}</Text>}
        </View>
      </TouchableOpacity>
    );
  }
}
export default FlightPlanDetailTopBtn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  btn: {
    marginTop: 20,
    paddingHorizontal: 5,
    width: 60,
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 40,
    elevation: 4,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  text: {
    textTransform: "uppercase",
    fontFamily: Fonts.Roboto.black,
    color: "black",
    fontSize: 12
  }
});
