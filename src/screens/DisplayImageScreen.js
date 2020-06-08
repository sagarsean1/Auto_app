import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
const { height, width } = Dimensions.get("screen");
const DisplayFullImage = ({ navigation, route }) => {
  const title = route.params.headerName;
  const imageUri = route.params.imageUri;
  navigation.setOptions({
    title: title,
    headerRight: () => (
      <TouchableOpacity onPress={() => deleteImages(imageUri)}>
        <MaterialCommunityIcons
          name="delete-outline"
          size={30}
          style={{ right: 5 }}
        />
      </TouchableOpacity>
    ),
  });
  const deleteImages = async (uri) => {
    const storageRef = firebase.storage().refFromURL(uri);
    await storageRef
      .delete()
      .then(() => {
        console.log("deleted");
        navigation.goBack();
      })
      .catch((error) => console.log(error));
  };
  return (
    <View style={styles.container}>
      {title === "Profile Image" ? (
        <Image source={{ uri: imageUri }} style={styles.profImgContainer} />
      ) : (
        <Image source={{ uri: imageUri }} style={styles.docImgContainer} />
      )}
    </View>
  );
};

export default DisplayFullImage;

const styles = StyleSheet.create({
  profImgContainer: {
    justifyContent: "center",
    aspectRatio: 1 / 1,
    top: height / 6,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  docImgContainer: {
    top: height / 8,
    aspectRatio: 3 / 4,
  },
});
