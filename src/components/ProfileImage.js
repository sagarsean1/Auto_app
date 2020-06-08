import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

const ProfileImage = ({ imgUri, ImageHandler }) => {
  return (
    <TouchableOpacity onPress={ImageHandler}>
      <Image source={{ uri: imgUri }} style={styles.profileImg} />
    </TouchableOpacity>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  profileImg: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 100 / 2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: 30,
  },
});
