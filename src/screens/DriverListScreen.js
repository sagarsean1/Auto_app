import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Text,
} from "react-native";

import Search from "../components/Search";
import AutoList from "../components/AutoList";
import * as firebase from "firebase";
const DriverListScreen = ({ navigation }) => {
  //const autos = useSelector((state) => state.autos.autos);
  const [autos, setAutos] = useState({});
  const [searchText, setSearchText] = useState("");
  const [isListEmpty, setIsListEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    navigation.addListener("focus", () => {
      getAllAutos();
    });
  }, []);
  const getAllAutos = () => {
    let autoRef = firebase.database().ref();
    autoRef.on("value", (dataSnapshot) => {
      if (dataSnapshot.val()) {
        let autoResult = Object.values(dataSnapshot.val());
        let autoKey = Object.keys(dataSnapshot.val());
        autoKey.forEach((value, key) => {
          autoResult[key]["key"] = value;
        });

        setData(autoResult);
        setAutos(autoResult);
        setIsListEmpty(false);
      } else {
        setIsListEmpty(true);
      }
      setIsLoading(false);
    });
  };
  const onPressHandler = (text) => {
    var newdata;
    if (text.length > 0) {
      newdata = data.filter((item) => {
        return item.auto_num.search(text) !== -1 ? item : null;
      });
      setAutos(newdata);
    } else {
      setAutos(data);
    }
    console.log(newdata);
  };
  return isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.5)",
      }}
    >
      <ActivityIndicator size="large" />
      <Text style={{ textAlign: "center" }}>Loading....</Text>
    </View>
  ) : (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Search onPressHandler={(text) => onPressHandler(text)} />
        {!isListEmpty ? <AutoList autos={autos} /> : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DriverListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
});
