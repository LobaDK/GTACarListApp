import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GarageList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Garage List</Text>
      <Text>This is the garage list page.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
});

export default GarageList;