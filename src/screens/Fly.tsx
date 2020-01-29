import React, { Component } from "react";
import {
  View,
  Dimensions,
  Text,
  WebView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from "react-native";

import RNGamePadDual from "../components/game-pad/dual/dual-joystick";
import colors from "../colors";
import Icon from "react-native-vector-icons/Ionicons";
import { Fonts } from "../fonts";
import ManualFlightButton from "../components/ManualFlightButton";
import {
  TOLERANCE_PERCENT,
  MAX_DIRECTION_VALUE,
  MIN_DIRECTION_VALUE,
  MAX_MOTOR_VALUE,
  MIN_MOTOR_VALUE,
  PORT,
  IP
} from "../utils/OpenDroneUtils";
import { IStickMovement } from "../models/IStickMovement";
import {
  CODE_YAW,
  CODE_ROLL,
  CODE_THROTTLE,
  CODE_PITCH,
  CODE_ARM,
  CODE_ALT_CONTROL,
  CODE_GO_HOME
} from "../components/communication/opendrone/Codes";
import CommunicationManager from "../components/communication/opendrone/CommunicationManager";
import { OpenDroneFrame } from "../components/communication/opendrone/OpenDroneFrame";
import { OpenDroneController } from "../components/communication/opendrone/OpenDroneController";
import { IController } from "../components/communication/IController";
import { MAVLINK_ENABLED } from "../utils/StorageCodes";

let controller: IController;

interface Props {}
interface State {
  altHoldText: string;
  altHoldIcon: string;
  armText: string;
  armIcon: string;
  stickTouchedBottom: boolean;
  isArmed: boolean;
}

const options = {
  color: colors.notQuiteBlack,
  size: 500
};

class Fly extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      altHoldText: "ALT HOLD ON",
      altHoldIcon: "md-arrow-round-up",
      armText: "ARM",
      armIcon: "md-sync",
      stickTouchedBottom: false,
      isArmed: false
    };
  }

  async viewDidLoad() {
    const isMavLinkEnabled = await this.isMavLinkEnabled();
    if (isMavLinkEnabled) {
      controller = null;
    } else {
      controller = new OpenDroneController(IP, PORT);
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <RNGamePadDual
            style={{ width: "50%", height: "50%" }}
            options={options}
            options2={options}
            onRightMove={this.handleOnRightMove}
            onLeftMove={this.handleOnLeftMove}
          />
          <View style={styles.altHoldContainer}>
            <Text style={styles.altHoldTxt}>
              Altitude Hold is {this.state.altHoldIcon === "md-pause" ? "ON" : "OFF"}
            </Text>
            <View
              style={[
                styles.altHoldIndicator,
                {
                  backgroundColor: this.state.altHoldIcon === "md-pause" ? "#27ae60" : "#c0392b"
                }
              ]}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <ManualFlightButton
              style={styles.manFlightButton}
              text="HOME"
              onPress={() => this.handleGoHome()}
              iconName="md-home"
            />
            <ManualFlightButton
              style={{
                transform: [{ rotate: "90deg" }],
                margin: 10,
                width: 70
              }}
              text={this.state.altHoldText}
              onPress={() => this.hanldeAltHoldPressed()}
              iconName={this.state.altHoldIcon}
            />
            <ManualFlightButton
              style={styles.manFlightButton}
              text={this.state.armText}
              onPress={() => this.handleArmPressed()}
              iconName={this.state.armIcon}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  async isMavLinkEnabled(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(MAVLINK_ENABLED);
      if (value !== null) {
        // We have data!!
        const enabled = JSON.parse(value) as boolean;
        return enabled;
        return;
      }
    } catch (error) {
      console.log("error", error);
    }
    return false;
  }

  handleGoHome() {
    if (!controller) {
      return;
    }
    controller.sendGoHome();
  }

  handleOnRightMove = (evt, data) => {
    const rad = data.angle.radian;
    const distance = data.distance;
    const values = this.handleStickMove(rad, distance, false, MAX_DIRECTION_VALUE, MIN_DIRECTION_VALUE);
    if (this.state.stickTouchedBottom && this.state.isArmed) {
      if (!controller) {
        return;
      }
      controller.sendRightStick(values);
    }
  };

  handleOnLeftMove = (evt, data) => {
    const rad = data.angle.radian;
    const distance = data.distance;
    const values = this.handleStickMove(rad, distance, true, MAX_MOTOR_VALUE, MIN_MOTOR_VALUE);
    if (this.state.stickTouchedBottom && this.state.isArmed) {
      if (!controller) {
        return;
      }
      controller.sendLeftStick(values);
    }
  };

  handleStickMove(
    rad: number,
    distance: number,
    isThrottleStick: boolean,
    maxValue: number,
    minValue: number
  ): IStickMovement[] {
    const powerDifference = maxValue - minValue;

    //Calculation for the x-axis
    const hypothenusis = distance;
    let adjacentX = Math.cos(rad) * hypothenusis;
    let adjacentPercent = this.getPercentFromSticks(50, adjacentX);
    let values: IStickMovement[] = [];
    const yawOrRollVal = minValue + powerDifference * (adjacentPercent / 100.0);

    //Calculation for the y-axis
    let opposite = Math.sin(rad) * hypothenusis;
    let oppositePercent = this.getPercentFromSticks(50, opposite);
    const throttleOrPitchVal = minValue + powerDifference * (oppositePercent / 100.0);

    values[0] = { code: isThrottleStick ? CODE_YAW : CODE_ROLL, val: Math.round(yawOrRollVal) };
    values[1] = { code: isThrottleStick ? CODE_THROTTLE : CODE_PITCH, val: Math.round(throttleOrPitchVal) };

    if (values[1].val <= minValue + minValue * (TOLERANCE_PERCENT / 100) && isThrottleStick) {
      this.setState({ stickTouchedBottom: true });
    }

    return values;
  }

  getPercentFromSticks(center: number, value: number): number {
    let percent = center + value / 2;
    if (percent < 0) {
      percent = 0;
    }
    if (percent > 100) {
      percent = 100;
    }
    return percent;
  }

  handleArmPressed = () => {
    if (this.state.armIcon === "md-sync") {
      this.doArm();
    } else {
      this.doUnarm();
    }
  };

  doArm() {
    if (!controller) {
      return;
    }
    controller.sendArm();

    this.setState({
      armText: "STOP",
      armIcon: "md-hand",
      isArmed: true
    });
  }

  doUnarm() {
    if (!controller) {
      return;
    }
    controller.sendDisarm();

    this.setState({
      armText: "ARM",
      armIcon: "md-sync",
      isArmed: false
    });
  }

  activateAltHold() {
    this.setState({
      altHoldText: "ALT HOLD ON",
      altHoldIcon: "md-arrow-round-up"
    });

    if (!controller) {
      return;
    }
    controller.sendActivateAltHold();
  }

  stopAltHold() {
    this.setState({
      altHoldText: "ALT HOLD OFF",
      altHoldIcon: "md-pause"
    });

    if (!controller) {
      return;
    }
    controller.sendStopAltHold();
  }

  hanldeAltHoldPressed = () => {
    if (this.state.altHoldIcon === "md-arrow-round-up") {
      this.stopAltHold();
    } else {
      this.activateAltHold();
    }
  };
}
export default Fly;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    padding: 20
  },
  altHoldContainer: {
    flexDirection: "column",
    position: "absolute",
    top: 80,
    right: -50,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  altHoldTxt: {
    fontFamily: Fonts.Roboto.bold,
    width: 160,
    transform: [{ rotate: "90deg" }],
    color: "black"
  },
  altHoldIndicator: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginTop: 45
  },
  buttonsContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    position: "absolute",
    marginLeft: 20
  },
  manFlightButton: {
    transform: [{ rotate: "90deg" }],
    margin: 10,
    width: 70
  }
});

// <MapComponent latitude={LATITUDE} longitude={LONGITUDE} />
