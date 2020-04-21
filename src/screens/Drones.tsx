import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Image, Picker, AsyncStorage, TouchableOpacity } from "react-native";
import Map from "../components/Map";
import { Fonts } from "../fonts";
import colors from "../colors";
import { IDrone } from "../models/IDrone";
import { droneMocks } from "../mocks/DroneMock";
import { DRONE } from "../utils/StorageCodes";
import ImagePicker from "react-native-image-picker";

const imagePickerOptions = {
  title: "Select drone image",
  storageOptions: {
    skipBackup: true,
    path: "opendrone",
  },
};

interface Props {}

interface State {
  drones: IDrone[];
  selectedDroneIndex: number;
  nameErrorVisible: boolean;
}

class Drones extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      drones: droneMocks,
      selectedDroneIndex: 0,
      nameErrorVisible: false,
    };
  }

  componentDidMount() {
    this.readDroneConfig();
  }

  render() {
    const index = this.state.selectedDroneIndex;
    const drones = this.state.drones;
    const selectedDrone = drones[index];

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.droneImg} onPress={() => this.selectDroneImage()}>
          {!!selectedDrone.img ? (
            <Image
              source={{
                uri: selectedDrone.img,
              }}
              style={styles.droneImg}
              resizeMode="cover"
            />
          ) : (
            <Image source={require("../../assets/images/dronebg.png")} style={styles.droneImg} resizeMode="cover" />
          )}
        </TouchableOpacity>
        <View style={{ justifyContent: "flex-start", alignItems: "center", flexDirection: "column", flex: 1 }}>
          <TextInput
            placeholder="Name"
            style={styles.droneNameTextInput}
            maxLength={25}
            multiline={true}
            value={selectedDrone.name}
            onChangeText={(text) => this.changeDroneName(text)}
          />
          {this.state.nameErrorVisible && <Text style={styles.nameError}>Name must not be empty!</Text>}
          <TextInput
            placeholder="Description"
            maxLength={500}
            multiline={true}
            style={styles.droneDescriptionTextInput}
            value={selectedDrone.description}
            onChangeText={(text) => this.changeDroneName(text)}
          />
        </View>
      </View>
    );
  }

  selectDroneImage() {
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: "data:image/jpeg;base64," + response.data };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        const drone = this.getSelectedDrone();
        drone.img = source.uri;
        this.updateDrone(drone);
      }
    });
  }

  async readDroneConfig() {
    try {
      const value = await AsyncStorage.getItem(DRONE);
      if (value !== null) {
        // We have data!!
        const drone = JSON.parse(value) as IDrone;
        console.log(drone);
        this.setState({ drones: [drone] });
        return;
      }
      //this.setState({ drones: : false });
    } catch (error) {
      console.log("error", error);
    }
  }

  saveDroneName(drone: IDrone) {
    console.log(drone.name);
    if (drone.name.length <= 0) {
      this.setState({ nameErrorVisible: true });
      return;
    }
    this.setState({ nameErrorVisible: false });
    this.updateDrone(drone);
  }

  saveDroneConfig() {
    const drone = this.getSelectedDrone();
    AsyncStorage.setItem(DRONE, JSON.stringify(drone));
  }

  getSelectedDrone(): IDrone {
    const index = this.state.selectedDroneIndex;
    const drones = this.state.drones;
    return drones[index];
  }

  updateDrone(drone: IDrone) {
    const index = this.state.selectedDroneIndex;
    const drones = this.state.drones;
    drones[index] = drone;
    this.setState({ drones: drones });
    this.saveDroneConfig();
  }

  changeDroneDescription(newDescription: string) {
    const selectedDrone = this.getSelectedDrone();
    selectedDrone.description = newDescription;
    this.updateDrone(selectedDrone);
  }

  changeDroneName(newName: string) {
    const selectedDrone = this.getSelectedDrone();
    selectedDrone.name = newName.replace("\n", "");
    this.saveDroneName(selectedDrone);
  }
}
export default Drones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  topContainer: { flex: 1, alignItems: "center", justifyContent: "flex-start" },
  droneImg: { width: "100%", height: 250 },
  droneNameTextInput: { fontFamily: Fonts.Roboto.bold, fontSize: 32, color: colors.notQuiteBlack, maxWidth: "80%" },
  droneDescriptionTextInput: {
    fontFamily: Fonts.Roboto.regular,
    fontSize: 20,
    color: colors.notQuiteBlack,
    width: "80%",
    textAlign: "left",
  },
  calibrateButtonText: { fontFamily: Fonts.Roboto.bold, color: colors.notQuiteBlack, margin: 10 },
  bottomContainer: { justifyContent: "space-between", alignItems: "center", width: "85%" },
  currentDroneText: { fontFamily: Fonts.Roboto.bold, color: colors.notQuiteBlack, margin: 10 },
  nameError: { color: "red", fontFamily: Fonts.Roboto.bold, fontSize: 16 },
});
