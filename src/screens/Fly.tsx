import React, { Component } from "react";
import {
  View,
  Dimensions,
  Text,
  WebView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  PermissionsAndroid,
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
  IP,
} from "../utils/OpenDroneUtils";
import { IStickMovement } from "../models/IStickMovement";
import {
  CODE_YAW,
  CODE_ROLL,
  CODE_THROTTLE,
  CODE_PITCH,
  CODE_ARM,
  CODE_ALT_CONTROL,
  CODE_GO_HOME,
} from "../components/communication/opendrone/Codes";
import CommunicationManager from "../components/communication/opendrone/CommunicationManager";
import { OpenDroneFrame } from "../components/communication/opendrone/OpenDroneFrame";
import { OpenDroneController } from "../components/communication/opendrone/OpenDroneController";
import { IController } from "../components/communication/IController";
import { MAVLINK_ENABLED } from "../utils/StorageCodes";
import { MavLinkController } from "../components/communication/mavlink/MavLinkController";
import { NavigationEventSubscription } from "react-navigation";
import Map from "../components/Map";
import { LatLng, Polyline } from "react-native-maps";
import { DEFAULT_LATITUDE, DEFAULT_LATLNG } from "../defaults";
import { IFlightplan } from "../models/IFlightplan";
import { IWaypoint } from "../models/IWaypoint";
import YellowMarker from "../components/map/YellowMarker";

let controller: IController;

interface Props {
  navigation: {
    getParam(key: string, defValue?): {};
    goBack();
    navigate(path: string, params: {}): {};
  };
}
interface State {
  altHoldText: string;
  altHoldIcon: string;
  armText: string;
  armIcon: string;
  stickTouchedBottom: boolean;
  isArmed: boolean;
  userLocation: LatLng;
  selectedFlightplan: IFlightplan;
}

const options = {
  color: colors.notQuiteBlack,
  size: 500,
};

const DEFAULT_LOCATION = {
  latitude: 48.3209538,
  longitude: 14.5838411,
};

class Fly extends React.Component<Props, State> {
  stopSendingHeartbeats = false;
  didBlurSubscription: NavigationEventSubscription;
  willFocusSubscription: NavigationEventSubscription;
  interval: NodeJS.Timeout;
  mapView: Map | null = null;

  constructor(props: Props) {
    super(props);
    const selectedFlightplan = this.props.navigation.getParam("selectedFlightplan", {}) as IFlightplan;
    this.state = {
      altHoldText: "ALT HOLD ON",
      altHoldIcon: "md-arrow-round-up",
      armText: "ARM",
      armIcon: "md-sync",
      stickTouchedBottom: false,
      isArmed: false,
      userLocation: DEFAULT_LOCATION,
      selectedFlightplan: selectedFlightplan,
    };
  }

  async componentDidMount() {
    //this.sendHeartbeats();
    this.didBlurSubscription = this.props.navigation.addListener("didFocus", async (payload) => {
      const isMavLinkEnabled = await this.isMavLinkEnabled();
      if (isMavLinkEnabled) {
        controller = new MavLinkController(IP, PORT);
      } else {
        controller = new OpenDroneController(IP, PORT);
      }
      this.interval = setInterval(() => this.sendHeartbeat(), 1000);
    });

    this.willFocusSubscription = this.props.navigation.addListener("didBlur", (payload) => {
      clearInterval(this.interval);
    });
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
    this.didBlurSubscription.remove();
  }

  render() {
    const userLocation = this.state.userLocation;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Map
          style={{ width: "100%", height: "100%", position: "absolute" }}
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
          ref={(c) => (this.mapView = c)}
        >
          {this.state.selectedFlightplan.waypoints &&
            this.state.selectedFlightplan.waypoints.map((waypoint, flightplan) => {
              <YellowMarker coordinate={waypoint.location} />;
            })}

          {this.state.selectedFlightplan.waypoints && (
            <Polyline
              coordinates={this.state.selectedFlightplan.waypoints.map((waypoint) => waypoint.location)}
              strokeColor={colors.primaryColor}
              strokeWidth={4}
            />
          )}
        </Map>
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
                  backgroundColor: this.state.altHoldIcon === "md-pause" ? "#27ae60" : "#c0392b",
                },
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
                width: 70,
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

  animateToCoords(coordinates: LatLng) {
    if (this.mapView) {
      this.mapView.animateToCoordinate(coordinates);
    }
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "OpenDrone braucht deine Position",
        message: "Um OpenDrone in vollem Umfang benutzen zu können, benötigen wir deine Position",
        buttonNeutral: "Später",
        buttonNegative: "Abbrechen",
        buttonPositive: "OK",
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getUserPosition();
      } else {
        this.animateToCoords(this.state.userLocation);
      }
    } catch (err) {
      this.animateToCoords(this.state.userLocation);
    }
  }

  getUserPosition() {
    navigator.geolocation.requestAuthorization();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        /*const userLocation: LatLng = position.coords;
                this.setState({ userLocation });
                this.animateToCoords(userLocation);*/
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    navigator.geolocation.watchPosition(
      (position) => {
        /*const userLocation: LatLng = position.coords;
                this.setState({ userLocation });*/
      },
      (error) => console.log(error)
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

  async sendHeartbeat() {
    if (!controller) {
      return;
    }
    controller.sendHeartbeat();
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
      isArmed: true,
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
      isArmed: false,
    });
  }

  activateAltHold() {
    this.setState({
      altHoldText: "TAKEOFF",
      altHoldIcon: "md-arrow-round-up",
    });

    if (!controller) {
      return;
    }
    controller.sendTakeOff();
  }

  stopAltHold() {
    this.setState({
      altHoldText: "ALT HOLD OFF",
      altHoldIcon: "md-pause",
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
    padding: 20,
  },
  altHoldContainer: {
    flexDirection: "column",
    position: "absolute",
    top: 80,
    right: -50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  altHoldTxt: {
    fontFamily: Fonts.Roboto.bold,
    width: 160,
    transform: [{ rotate: "90deg" }],
    color: "black",
  },
  altHoldIndicator: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginTop: 45,
  },
  buttonsContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    position: "absolute",
    marginLeft: 20,
  },
  manFlightButton: {
    transform: [{ rotate: "90deg" }],
    margin: 10,
    width: 70,
  },
});

// <MapComponent latitude={LATITUDE} longitude={LONGITUDE} />
