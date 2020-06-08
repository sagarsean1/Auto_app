import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const AutoList = ({ autos }) => {
  const navigation = useNavigation();
  const renderAuto = (item) => {
    var imgUri =
      item.driver_img === "empty"
        ? require("../../assets/person.jpg")
        : { uri: item.driver_img };
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", { key: item.key })}
        style={styles.renderAutoStyle}
      >
        <View
          style={{
            flex: 1,

            flexDirection: "row",
            alignItems: "flex-start",
            marginLeft: 5,
          }}
        >
          <Text style={styles.autoNumStyle}>{item.auto_num}</Text>

          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              marginRight: 5,
            }}
          >
            <Text style={styles.driverNameStyle}>{item.driver_name}</Text>
          </View>
          <View>
            <Image source={imgUri} style={styles.imgStyle} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={autos}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => renderAuto(item)}
      />
    </SafeAreaView>
  );
};

export default AutoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  renderAutoStyle: {
    borderWidth: 1,
    borderColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  imgStyle: {
    height: 70,
    width: 70,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 100 / 2,
  },
  autoNumStyle: {
    fontWeight: "bold",
    fontSize: 22,

    alignSelf: "center",
  },
  driverNameStyle: {
    fontStyle: "italic",
    fontSize: 18,
    marginRight: 10,
    top: 20,
  },
});
