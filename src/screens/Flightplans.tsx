import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  RefreshControl
} from "react-native";

import { flightplans } from "../mocks/FlightplanMock";
import { Fonts } from "../fonts";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface State {
  isRefreshing: boolean;
}

interface Props {}

class Flightplans extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isRefreshing: false
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={flightplans}
          renderItem={({ item, index }) => (
            <View
              style={{
                flex: 1,
                marginRight:
                  index % 2 == 0 && index !== flightplans.length - 1 ? 5 : 0,
                marginLeft: index % 2 == 1 ? 5 : 0,
                marginTop: 10,
                borderRadius: 3,
                backgroundColor: "#ffffff",
                padding: 10,
                elevation: 4,
                height: 100,
                textShadowColor: "rgba(0, 0, 0, 0.75)",
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  height: "100%"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    heigth: "100%",
                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: 20,
                      fontFamily: Fonts.Roboto.bold
                    }}
                  >
                    {item.name.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          numColumns={2}
          keyExtractor={(item, index) => `${index}`}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
        />
      </SafeAreaView>
    );
  }

  private _onRefresh() {
    this.setState({ isRefreshing: false });
  }
}
export default Flightplans;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 10,
    backgroundColor: "#fafafa"
  }
});
