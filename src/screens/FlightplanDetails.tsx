import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Clipboard,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  AsyncStorage,
} from "react-native";
import { IFlightplan } from "../models/IFlightplan";
import colors from "../colors";
import { Fonts } from "../fonts";
import Icon from "react-native-vector-icons/Ionicons";
import Toast, { DURATION } from "react-native-easy-toast";
import { IWaypoint } from "../models/IWaypoint";
import Map from "../components/Map";
import Background from "../components/Background";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Marker, Region, MapEvent } from "react-native-maps";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE, DEFAULT_LATLNG, DEFAULT_REGION } from "../defaults";
import CustomMarker from "../components/CustomMarker";
import FlightPlanDetailTopBtn from "../components/FlightPlanDetailTopBtn";
import { FLIGHTPLANS } from "../utils/StorageCodes";

interface Props {
  navigation: {
    getParam(key, defValue): {};
    goBack();
    popToTop();
    navigate(path, params): {};
  };
  draggableRange: {
    top: number;
    bottom: number;
  };
}
interface State {
  flightplan: IFlightplan;
  selectedWaypoint: IWaypoint;
  selectedIndex: number;
  correctKeyboard: boolean;
  allowDragging: boolean;
  pointerEvents: string;
  editedTitle: string;
  editedDesc: string;
  descHeight: number;
  titleHeight: number;
  saveTop: Animated.Value;
  isCreating: boolean;
  isSaveDisabled: boolean;
}

class FlightplanDetails extends Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  static defaultProps = {
    draggableRange: {
      top: 500,
      bottom: 50,
    },
  };

  _panel: SlidingUpPanel;
  map: Map;

  _draggedValue = new Animated.Value(50);

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const flightplan = navigation.getParam("flightplan", {}) as IFlightplan;
    const isCreating = navigation.getParam("isCreating", false) as boolean;
    this.state = {
      flightplan: flightplan,
      selectedWaypoint: {
        location: { latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE },
      },
      selectedIndex: -1,
      correctKeyboard: false,
      allowDragging: true,
      pointerEvents: "none",
      editedTitle: flightplan.name,
      editedDesc: flightplan.description,
      titleHeight: 0,
      descHeight: 0,
      saveTop: new Animated.Value(-120),
      isCreating: isCreating,
      isSaveDisabled: false,
    };
  }

  render() {
    const { top, bottom } = this.props.draggableRange;

    const draggedValue = this._draggedValue.interpolate({
      inputRange: [bottom, top],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    const transform = [{ scale: draggedValue }];
    const { goBack } = this.props.navigation;
    return (
      <SafeAreaView style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
        <Background />
        <View style={styles.container}>
          <FlightPlanDetailTopBtn text={this.state.isCreating ? "save" : "back"} onPress={() => this.goBackPressed()} />
          <Animated.View style={[styles.globalActionContainer, { top: this.state.saveTop }]}>
            {!this.state.isSaveDisabled && (
              <FlightPlanDetailTopBtn text="save" onPress={() => this.saveTitleAndDesc()} />
            )}
            <FlightPlanDetailTopBtn text="reset" onPress={() => this.reset()} />
          </Animated.View>
          <TextInput
            style={[styles.nameTxt, { height: Math.max(35, this.state.titleHeight) }]}
            value={this.state.editedTitle}
            placeholder="title"
            multiline={true}
            onContentSizeChange={(event) => {
              this.setState({
                titleHeight: event.nativeEvent.contentSize.height,
              });
            }}
            onChangeText={(text) => this.handleTitleEdited(text)}
          />
          <TextInput
            style={[styles.descriptionTxt, { height: Math.max(35, this.state.descHeight) }]}
            value={this.state.editedDesc}
            placeholder="description"
            multiline={true}
            onContentSizeChange={(event) => {
              this.setState({
                descHeight: event.nativeEvent.contentSize.height,
              });
            }}
            onChangeText={(text) => this.handleDescriptionEdited(text)}
          />

          <View style={{ marginTop: 20 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.useFlightplan()}>
              <Text style={styles.viewMapTxt}>USE THIS FLIGHTPLAN</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 5 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.routeTxt}>Route:</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.showOnMap()}>
                <Text style={styles.viewMapTxt}>VIEW MAP</Text>
              </TouchableOpacity>
            </View>
            {this.state.flightplan.waypoints.map((waypoint, index) => (
              <View key={index} style={[styles.markerContainer]}>
                <View style={styles.locationContainer}>
                  <Icon name="md-pin" color={colors.primaryColor} size={24} style={{ marginRight: 10 }} />
                  <View style={styles.latlngContainer}>
                    <Text style={styles.latlngTxt}>LAT: {waypoint.location.latitude}</Text>
                    <Text style={styles.latlngTxt}>LNG: {waypoint.location.longitude}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity activeOpacity={0.5} onPress={() => this.showEditLocation(waypoint, index)}>
                    <Icon name="md-create" color={colors.primaryColor} size={24} style={{ marginRight: 10 }} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this.copyToClipboard(waypoint.location.latitude, waypoint.location.longitude)}
                  >
                    <Icon name="md-copy" color={colors.primaryColor} size={24} style={{ marginRight: 10 }} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <SlidingUpPanel
            showBackdrop={false}
            ref={(c) => (this._panel = c)}
            draggableRange={this.props.draggableRange}
            animatedValue={this._draggedValue}
            onDragStart={() => this.setState({ pointerEvents: "none" })}
            onDragEnd={() => this.setState({ pointerEvents: null })}
            allowDragging={this.state.allowDragging}
          >
            <View style={styles.panel}>
              {this.renderBottomSheetHeader()}
              {this.renderContent()}
            </View>
          </SlidingUpPanel>
          <Toast
            ref="toast"
            opacity={1}
            positionValue={160}
            style={{
              backgroundColor: "#e5e5e5",
              borderRadius: 20,
            }}
            textStyle={{
              color: colors.notQuiteBlack,
              padding: 3,
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  useFlightplan() {
    this.goBackPressed();
    this.props.navigation.navigate("Fly", { selectedFlightplan: this.state.flightplan });
  }

  renderBottomSheetHeader = () => {
    return (
      <View style={styles.panelHeader}>
        <View style={styles.upslider} />
        {this.state.selectedIndex >= 0 ? (
          <Text style={styles.upDrawerTxt}>{`edit waypoint #${this.state.selectedIndex}`}</Text>
        ) : (
          <Text style={styles.upDrawerTxt}>select a waypoint to edit</Text>
        )}
      </View>
    );
  };

  renderContent = () => {
    return (
      <View style={styles.bottomDrawerContent}>
        <View
          style={{ height: 200, width: "100%", overflow: "hidden" }}
          //@ts-ignore
          pointerEvents={this.state.pointerEvents}
          onMoveShouldSetResponder={() => {
            this.setState({ allowDragging: false });
            console.log(this.state.allowDragging);
            return true;
          }}
          onResponderRelease={() => this.setState({ allowDragging: true })}
        >
          <Map
            ref={(c) => (this.map = c)}
            latitude={this.state.selectedWaypoint.location.latitude}
            longitude={this.state.selectedWaypoint.location.longitude}
            onPress={(event) => this.onPress(event)}
          >
            <Marker coordinate={this.state.selectedWaypoint.location}>
              <Icon name="md-pin" color={colors.primaryColor} size={24} style={{ marginRight: 10 }} />
            </Marker>
          </Map>
        </View>
        <View style={styles.underMapContainer}>
          <View style={styles.coordinateEditContainer}>
            <Text style={styles.coordinateLabel}>LATITUDE: </Text>
            <TextInput
              style={styles.coordinateInput}
              onChangeText={(text) => this.handleLatTyped(text)}
              value={`${this.state.selectedWaypoint.location.latitude}`}
            />
          </View>
          <View style={styles.coordinateEditContainer}>
            <Text style={styles.coordinateLabel}>LONGITUDE: </Text>
            <TextInput
              style={styles.coordinateInput}
              onChangeText={(text) => this.handleLngTyped(text)}
              value={`${this.state.selectedWaypoint.location.longitude}`}
            />
          </View>
          <View style={styles.panelActionContainer}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.save()} style={styles.sliderActionContainer}>
              <Text style={styles.sliderActionTxt}>{this.state.selectedIndex >= 0 ? `SAVE` : `ADD NEW`}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.cancel()} style={styles.sliderActionContainer}>
              <Text style={styles.sliderActionTxt}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  goBackPressed() {
    this.saveToAsyncStorage();
    if (!this.state.isCreating) {
      this.props.navigation.goBack();
      return;
    }

    this.props.navigation.popToTop();
  }

  saveTitleAndDesc = () => {
    if (this.state.editedTitle.length <= 0) {
      this.showToast("Please enter a title");
      Animated.timing(this.state.saveTop, {
        toValue: 5,
        duration: 50,
      }).start(() => {
        Animated.timing(this.state.saveTop, {
          toValue: 0,
          duration: 50,
        }).start();
      });
      return;
    }
    const flightplan = this.state.flightplan;
    flightplan.name = this.state.editedTitle;
    flightplan.description = this.state.editedDesc;
    this.setState({ flightplan: flightplan }, () => {
      this.reset();
    });
  };

  async saveToAsyncStorage() {
    const flightplan = this.state.flightplan;
    try {
      const flightplansString = await AsyncStorage.getItem(FLIGHTPLANS);
      let flightplans: IFlightplan[];
      if (flightplansString !== null) {
        flightplans = JSON.parse(flightplansString) as IFlightplan[];
        const index = flightplans.findIndex((f) => f.id === flightplan.id);
        if (index < 0) {
          flightplans.push(flightplan);
        } else {
          flightplans[index] = flightplan;
        }
      } else {
        flightplans = [];
        flightplans.push(flightplan);
      }
      AsyncStorage.setItem(FLIGHTPLANS, JSON.stringify(flightplans));
    } catch (error) {
      // Error retrieving data
    }
  }

  reset() {
    this.setState(
      {
        editedTitle: this.state.flightplan.name,
        editedDesc: this.state.flightplan.description,
      },
      () => {
        this.checkShowSave();
      }
    );
  }

  checkShowSave() {
    const showSave =
      this.state.editedTitle !== this.state.flightplan.name ||
      this.state.editedDesc !== this.state.flightplan.description;
    if (showSave) {
      Animated.spring(this.state.saveTop, {
        toValue: 0,
        bounciness: 15,
      }).start();
    } else {
      Animated.spring(this.state.saveTop, {
        toValue: -60,
        bounciness: 15,
      }).start();
    }
  }

  handleTitleEdited = (text: string) => {
    this.setState({ editedTitle: text }, () => this.checkShowSave());
  };

  handleDescriptionEdited = (text: string) => {
    this.setState({ editedDesc: text }, () => this.checkShowSave());
  };

  onPress = (event: MapEvent) => {
    const location = event.nativeEvent.coordinate;
    const selectedWaypoint = { ...this.state.selectedWaypoint };
    selectedWaypoint.location = location;
    this.setState({ selectedWaypoint: selectedWaypoint });
  };

  cancel() {
    this._panel.hide();
    this.setState({
      selectedIndex: -1,
      selectedWaypoint: {
        location: DEFAULT_LATLNG,
      },
    });
    this.map.mapView.animateToRegion(DEFAULT_REGION);
  }

  save() {
    this._panel.hide();
    const selectedWaypoint = this.state.selectedWaypoint;
    const selectedIndex = this.state.selectedIndex;
    const flightplan = this.state.flightplan;
    if (selectedIndex < 0) {
      flightplan.waypoints.push(selectedWaypoint);
    } else {
      flightplan.waypoints[selectedIndex] = selectedWaypoint;
    }
    this.setState({
      flightplan: flightplan,
      selectedIndex: -1,
      selectedWaypoint: { location: DEFAULT_REGION },
    });
  }

  showLatInputCorrectly(isFocused) {
    console.log("latinput");
    this.setState({
      correctKeyboard: isFocused,
    });
  }

  handleLatTyped(text: string) {
    if (!text) {
      text = "0";
    }
    const parsedText = parseFloat(text);
    if (!isNaN(parsedText)) {
      const selectedWaypoint = { ...this.state.selectedWaypoint };
      const location = { ...selectedWaypoint.location };
      location.latitude = parsedText;
      selectedWaypoint.location = location;
      this.setState({ selectedWaypoint: selectedWaypoint });
    }
  }

  handleLngTyped(text: string) {
    if (!text) {
      text = "0";
    }
    const parsedText = parseFloat(text);
    if (!isNaN(parsedText)) {
      const selectedWaypoint = { ...this.state.selectedWaypoint };
      const location = { ...selectedWaypoint.location };
      location.longitude = parsedText;
      selectedWaypoint.location = location;
      this.setState({ selectedWaypoint: selectedWaypoint });
    }
  }

  showEditLocation(waypoint: IWaypoint, index: number) {
    this.setState({
      selectedWaypoint: { ...waypoint },
      selectedIndex: index,
      allowDragging: true,
    });
    this._panel.show(500);
    const location = waypoint.location;
    const region: Region = {
      ...location,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    };
    this.map.mapView.animateToRegion(region);
  }

  showOnMap = () => {
    console.log(this.state.flightplan.waypoints);
    this.props.navigation.navigate("FlightplanMap", {
      waypoints: this.state.flightplan.waypoints,
    });
  };

  showToast(text: string) {
    //@ts-ignore
    this.refs.toast.show(text, DURATION.LENGTH_SHORT);
  }

  copyToClipboard(lat: number, lng: number) {
    Clipboard.setString(`${lat},${lng}`);
    this.showToast("Copied to clipboard");
  }
}
export default FlightplanDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  nameTxt: {
    color: "black",
    fontSize: 40,
    fontFamily: Fonts.Roboto.bold,
    width: "100%",
    margin: 0,
  },
  descriptionTxt: {
    fontFamily: Fonts.Roboto.regular,
    fontSize: 17,
    color: colors.notQuiteBlack,
    margin: 0,
    marginTop: 10,
  },
  routeTxt: {
    fontFamily: Fonts.Roboto.bold,
    fontSize: 15,
    color: "black",
    textTransform: "uppercase",
  },
  markerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  latlngContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  latlngTxt: {
    color: colors.notQuiteBlack,
    fontFamily: Fonts.Roboto.medium,
  },
  bottomDrawerContent: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    paddingVertical: 10,
  },
  upslider: {
    width: 40,
    backgroundColor: "grey",
    height: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  upDrawerTxt: {
    color: "black",
    textAlign: "center",
    marginVertical: 10,
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 3,
    fontFamily: Fonts.Roboto.bold,
  },
  latStyle: {
    position: "absolute",
    width: "100%",
    height: 20,
    backgroundColor: "red",
    top: -300,
    margin: 10,
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 4,
  },
  panelHeader: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  viewMapTxt: {
    fontFamily: Fonts.Roboto.bold,
    color: colors.notQuiteBlack,
    fontSize: 12,
  },
  sliderActionTxt: {
    fontFamily: Fonts.Roboto.bold,
    color: colors.almostWhite,
    fontSize: 13,
  },
  sliderActionContainer: {
    backgroundColor: colors.primaryColor,
    borderRadius: 35,
    width: 80,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  panelActionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  coordinateInput: {
    borderWidth: 0,
    fontSize: 14,
    flex: 1,
    fontFamily: Fonts.Roboto.bold,
    color: "black",
  },
  coordinateLabel: {
    fontFamily: Fonts.Roboto.bold,
    fontSize: 14,
    color: "black",
    width: 100,
  },
  coordinateEditContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  underMapContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 5,
  },
  globalActionContainer: {
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 10,
  },
});
