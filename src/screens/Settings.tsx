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
      mavLinkEnabled: false,
    };
  }

  componentDidMount() {
    this.readSettings();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.settingsHeading}>Settings</Text>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsItemTitle}>Enable MavLink</Text>
          <Switch
            value={this.state.mavLinkEnabled}
            onValueChange={(value) => {
              this.handleMavlinkEnabledChanged(value);
            }}
          ></Switch>
        </View>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsItemTitle}>Language</Text>
          <Text style={styles.settingsItemValue}>English</Text>
        </View>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsItemTitle}>Version</Text>
          <Text style={styles.settingsItemValue}>1.1.0</Text>
        </View>
      </View>
    );
  }

  handleMavlinkEnabledChanged(newValue: boolean) {
    this.saveMavLinkEnabled(newValue);
    this.setState({ mavLinkEnabled: newValue });
  }

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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 10,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  settingsHeading: { fontSize: 30, fontFamily: Fonts.Roboto.bold, color: colors.notQuiteBlack },
  settingsItemTitle: { color: colors.notQuiteBlack, fontFamily: Fonts.Roboto.medium, fontSize: 16 },
  settingsItemValue: { fontFamily: Fonts.Roboto.regular },
});
