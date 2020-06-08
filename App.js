import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Navigation from "./src/navigation/Navigation";

import * as firebase from "firebase";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Setting a timer"]);
var firebaseConfig = {
  apiKey: "AIzaSyBHwHg1maQJ0FCsV5thmdSf-lrQI63AFCU",
  authDomain: "auto-app-afee2.firebaseapp.com",
  databaseURL: "https://auto-app-afee2.firebaseio.com",
  projectId: "auto-app-afee2",
  storageBucket: "auto-app-afee2.appspot.com",
  messagingSenderId: "80329658169",
  appId: "1:80329658169:web:f60e0bef035b504d5ce2e8",
  measurementId: "G-64CHTML1CL",
};

firebase.initializeApp(firebaseConfig);
export default function App() {
  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
