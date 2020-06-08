import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const ProfileImageDisplay = ({ profileImg, auto_num }) => {
  const navigation = useNavigation();
  var imgUri =
    profileImg === "empty"
      ? require("../../assets/person.jpg")
      : { uri: profileImg };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Image", {
            imageUri: profileImg,
            headerName: "Profile Image",
          })
        }
      >
        <Image source={imgUri} style={styles.imageContainer} />
      </TouchableOpacity>
      <Text style={styles.textStyle}>{auto_num}</Text>
    </View>
  );
};

export default ProfileImageDisplay;

const styles = StyleSheet.create({
  container: { alignSelf: "center", bottom: 60 },
  imageContainer: {
    height: 120,
    width: 120,
    borderRadius: 200 / 2,
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: "white",
  },
  textStyle: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
  },
});
