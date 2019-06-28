import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  RefreshControl
} from 'react-native';

import { flightplans } from '../mocks/FlightplanMock';
import { Fonts } from '../fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SingleFlightplan from '../components/SingleFlightplan';
import colors from '../colors';
import Background from '../components/Background';

interface State {
  isRefreshing: boolean;
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
      isRefreshing: false
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Background />
        <View
          style={{
            padding: 10
          }}
        >
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
                  backgroundColor: '#ffffff',
                  padding: 10,
                  elevation: 4,
                  height: 100,
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10
                }}
              >
                <SingleFlightplan
                  flightplan={item}
                  navigation={this.props.navigation}
                />
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
        </View>
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
    width: '100%',
    height: '100%',
    backgroundColor: colors.fadedYellow
  }
});
