import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, RefreshControl, AsyncStorage } from "react-native";

import { flightplans } from "../mocks/FlightplanMock";
import { Fonts } from "../fonts";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import SingleFlightplan from "../components/SingleFlightplan";
import colors from "../colors";
import Background from "../components/Background";
import FlightPlanDetailTopBtn from "../components/FlightPlanDetailTopBtn";
import { IFlightplan } from "../models/IFlightplan";
import { FLIGHTPLANS } from "../utils/StorageCodes";

interface State {
  isRefreshing: boolean;
  flightplans: IFlightplan[];
}

interface Props {
  navigation: {
    navigate(string, {});
  };
}

class Flightplans extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isRefreshing: false,
      flightplans: [],
    };
  }

  componentDidMount() {
    this.getFlightplansFromStorage();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Background />
        <View
          style={{
            padding: 10,
          }}
        >
          <FlatList
            data={this.state.flightplans}
            style={{ height: "100%" }}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flex: 1,
                  marginRight: index % 2 == 0 && index !== flightplans.length - 1 ? 5 : 0,
                  marginLeft: index % 2 == 1 ? 5 : 0,
                  marginTop: 10,
                  borderRadius: 3,
                  backgroundColor: "#ffffff",
                  elevation: 4,
                  height: 200,
                  textShadowColor: "rgba(0, 0, 0, 0.75)",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10,
                }}
              >
                <SingleFlightplan key={index} flightplan={item} navigation={this.props.navigation} />
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => `${index}`}
            refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this._onRefresh()} />}
          />
        </View>
        <View style={styles.bottomRightContainer2}>
          <FlightPlanDetailTopBtn text="add" onPress={() => this.addFlightPlan()} style={{ marginRight: 20 }} />
        </View>
      </SafeAreaView>
    );
  }

  addFlightPlan() {
    this.props.navigation.navigate("FlightplanMap", { waypoints: [] });
  }

  async getFlightplansFromStorage() {
    try {
      const flightplansString = await AsyncStorage.getItem(FLIGHTPLANS);
      let flightplans: IFlightplan[];
      if (flightplansString !== null) {
        flightplans = JSON.parse(flightplansString) as IFlightplan[];
        this.setState({ flightplans: flightplans });
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  private _onRefresh() {
    this.getFlightplansFromStorage();
    this.setState({ isRefreshing: false });
  }
}
export default Flightplans;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.fadedYellow,
  },
  bottomRightContainer2: { elevation: 6, position: "absolute", right: 0, bottom: 0, margin: 20 },
});
