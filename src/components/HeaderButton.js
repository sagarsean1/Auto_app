import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const HeaderButton = ({ name, data, id }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {name === "create" ? (
        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <Ionicons name="md-add" size={30} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate("Edit", { data, id })}
        >
          <AntDesign name="edit" size={30} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
});
