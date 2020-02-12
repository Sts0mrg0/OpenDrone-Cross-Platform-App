import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

interface State {}
interface Props {
  navigation: {
    getParam(key: string, defValue?): {};
    goBack();
    navigate(path: string, params: {}): {};
  };
}

class AddEditDrone extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text>AddEditDrone</Text>
      </View>
    );
  }
}
export default AddEditDrone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
