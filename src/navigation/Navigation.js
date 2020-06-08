import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DriverDetailScreen from "../screens/DriverDetailScreen";
import DriverCreateScreen from "../screens/DriverCreateScreen";
import EditDetailScreen from "../screens/EditDetailScreen";
import DriverListScreen from "../screens/DriverListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderButton from "../components/HeaderButton";

import Colors from "../constants/Colors";
import DisplayImageScreen from "../screens/DisplayImageScreen";
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={DriverListScreen}
          options={{
            title: "AUTO LIST",
            headerTitleStyle: { fontWeight: "bold" },
            headerRight: () => <HeaderButton name="create" data="" />,
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditDetailScreen}
          options={{
            title: "EDIT DETAILS",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DriverDetailScreen}
          options={{
            title: "DRIVER DETAILS",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Create"
          component={DriverCreateScreen}
          options={{
            title: "CREATE DETAILS",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="Image"
          component={DisplayImageScreen}
          options={{
            title: "Display Image",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
