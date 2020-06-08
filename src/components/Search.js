import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View, Touchable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const Search = ({ onPressHandler }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <View style={styles.searchContainer}>
      <Text style={{ marginHorizontal: 5, fontWeight: "bold" }}>
        <AntDesign name="search1" size={25} />
      </Text>
      <TextInput
        style={styles.inputTextStyle}
        placeholder="Search"
        keyboardType="decimal-pad"
        onChangeText={(text) => {
          onPressHandler(text);
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    borderWidth: 1,
    borderRadius: 30,
    width: "80%",
    marginBottom: 10,
    padding: 8,
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  inputTextStyle: {
    marginLeft: 10,
    fontSize: 18,
    flex: 1,
  },
});
