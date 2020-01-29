import React, { Component } from "react";
import { View, Text, StyleSheet, Switch, AsyncStorage } from "react-native";
import { MAVLINK_ENABLED } from "../utils/StorageCodes";
import colors from "../colors";
import { Fonts } from "../fonts";

interface Props {}

interface State {
  mavLinkEnabled: boolean;
}

class Settings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      mavLinkEnabled: false
    };
  }

  componentDidMount() {
    this.readSettings();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: colors.notQuiteBlack, fontFamily: Fonts.Roboto.bold, fontSize: 14 }}>
            Enable MavLink
          </Text>
          <Switch
            value={this.state.mavLinkEnabled}
            onValueChange={value => {
              this.handleMavlinkEnabledChanged(value);
            }}
          ></Switch>
        </View>
      </View>
    );
  }

  handleMavlinkEnabledChanged(newValue: boolean) {
    this.saveMavLinkEnabled(newValue);
    this.setState({ mavLinkEnabled: newValue });
  }

  //TODO
  async readSettings() {
    try {
      const value = await AsyncStorage.getItem(MAVLINK_ENABLED);
      if (value !== null) {
        // We have data!!
        const enabled = JSON.parse(value) as boolean;
        this.setState({ mavLinkEnabled: enabled });
        return;
      }
      this.setState({ mavLinkEnabled: false });
    } catch (error) {
      console.log("error", error);
    }
  }

  //TODO
  async saveMavLinkEnabled(enabled: boolean) {
    try {
      await AsyncStorage.setItem(MAVLINK_ENABLED, JSON.stringify(enabled));
    } catch (error) {
      console.log("error", error);
    }
  }
}
export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
