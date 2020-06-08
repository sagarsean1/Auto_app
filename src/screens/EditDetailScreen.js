import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ProfileImage from "../components/ProfileImage";

import firebase from "firebase";
import { set } from "react-native-reanimated";
const EditDetailScreen = ({ navigation, route }) => {
  const [clicked, setClicked] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [imgUri, setImageUri] = useState("empty");
  const [autoNo, setAutoNo] = useState("");
  const [driverName, setDriverName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [docs, setDocs] = useState([]);
  const [prevDocs, setPrevDocs] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    var key = route.params.id;
    getDetails(key);
  }, []);
  const getDetails = (key) => {
    const autoRef = firebase.database().ref().child(key);
    const autoResult = autoRef.on("value", (dataSnapshot) => {
      if (dataSnapshot.val()) {
        var data = dataSnapshot.val();
        setAutoNo(data.auto_num);
        setDriverName(data.driver_name);
        setPhoneNo(data.driver_phone);
        setImageUri(data.driver_img);
        setPrevDocs(data.driver_proofs !== "empty" ? data.driver_proofs : []);
        setDocs(data.driver_proofs !== "empty" ? data.driver_proofs : []);
      }
    });
    setIsLoading(false);
  };
  //const dispatch = useDispatch();
  const uploadImageAsync = async (uri, storageRef, folder) => {
    const fileExtension = ".jpg";
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function (error) {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        console.log(error);
        reject(new TypeError("network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const ref = storageRef
      .child(folder)
      .child(Date.now().toString() + fileExtension);
    const snapshot = await ref.put(blob);
    blob.close();
    return await ref.getDownloadURL();
  };

  const ImageHandler = async (aspect, setImageUri, setDocs, launchType) => {
    try {
      let result;
      if (launchType === "camera") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: aspect,
          quality: 0.3,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: aspect,
          quality: 0.3,
        });
      }
      if (!result.cancelled) {
        if (setImageUri) {
          await setImageUri(result.uri);
        } else await setDocs([result.uri, ...docs]);
      }
    } catch (E) {
      console.log(E);
    }
    setClicked(false);
    console.log(docs);
  };
  const renderImage = (item) => {
    return (
      <Image
        style={styles.renderImageStyle}
        onLoadEnd={() => setImgLoading(false)}
        source={{ uri: item }}
      />
    );
  };
  const deleteImages = async (uri) => {
    const storageRef = firebase.storage().refFromURL(uri);
    await storageRef
      .delete()
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => console.log(error));
  };
  const deleteOld = async () => {
    if (imgUri !== "empty") await deleteImages(imgUri);
    if (prevDocs.length !== 0) {
      for (let ind = 0; ind < prevDocs.length; ind++) {
        await deleteImages(prevDocs[ind]);
      }
    }
  };
  const updateDetails = async () => {
    if (autoNo !== "" && driverName !== "" && phoneNo !== "") {
      setIsUploading(true);

      const dbRef = firebase.database().ref().child(route.params.id);
      const storageRef = firebase.storage().ref();
      var downloadUrl = null;
      var docImgs = [];
      if (imgUri !== "empty") {
        downloadUrl = await uploadImageAsync(
          imgUri,
          storageRef,
          "auto-profile-images"
        );
      } else downloadUrl = "empty";
      if (docs.length !== 0) {
        for (var ind = 0; ind < docs.length; ind++) {
          var imgData = await uploadImageAsync(
            docs[ind],
            storageRef,
            "driver-proof-images"
          );
          docImgs = [...docImgs, imgData];
          console.log("ImageDataurl ", imgData);
        }
      } else docImgs = "empty";
      console.log("docs ", docs);
      var details = {
        auto_num: autoNo,
        driver_name: driverName,
        driver_phone: phoneNo,
        driver_img: downloadUrl,
        driver_proofs: docImgs,
      };
      console.log(details);
      await dbRef.update(details, (error) => {
        if (!error) {
          deleteOld();
          setIsUploading(false);

          navigation.goBack();
        } else {
          console.log(error);
        }
      });
    } else {
      Alert.alert("Error", "Fill the fields");
    }
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {isUploading ? (
        <Modal transparent={true} animationType={"none"} visible={isUploading}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator size="large" animating={isUploading} />
            </View>
          </View>
        </Modal>
      ) : null}
      <View style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>
        {imgUri !== "empty" ? (
          <ProfileImage
            imgUri={imgUri}
            ImageHandler={() =>
              ImageHandler([1, 1], setImageUri, null, "camera")
            }
          />
        ) : (
          <TouchableOpacity
            style={styles.profileImg}
            onPress={() => ImageHandler([1, 1], setImageUri, null, "camera")}
          >
            <Ionicons name="md-add" size={20} />
          </TouchableOpacity>
        )}
        <View style={{ top: 80, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => ImageHandler([3, 4], setImageUri, null, "upload")}
            style={{}}
          >
            <Feather name="upload" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Auto No </Text>
          <Text style={styles.label}>Driver Name </Text>
          <Text style={styles.label}>Phone No </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            keyboardType="numeric"
            placeholder="Enter auto no."
            value={autoNo}
            onChangeText={(text) => setAutoNo(text)}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Enter text"
            value={driverName}
            onChangeText={(text) => setDriverName(text)}
          />
          <TextInput
            style={styles.inputText}
            keyboardType="numeric"
            placeholder="Enter phone no."
            value={phoneNo}
            onChangeText={(text) => setPhoneNo(text)}
          />
        </View>
      </View>
      <Text style={{ ...styles.label, marginLeft: 10 }}>Upload Docs</Text>
      <View
        style={{
          flex: 1,
          marginBottom: 70,

          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {!clicked ? (
          <TouchableOpacity
            style={styles.filesUploadStyle}
            //onPress={() => ImageHandler([3, 4], null, setDocs)}
            onPress={() => setClicked(!clicked)}
          >
            <Ionicons name="md-add" size={20} style={{ alignSelf: "center" }} />
          </TouchableOpacity>
        ) : (
          <View style={styles.filesUploadStyle}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => ImageHandler([3, 4], null, setDocs, "camera")}
              >
                <Entypo name="camera" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => ImageHandler([3, 4], null, setDocs, "upload")}
              >
                <Feather name="upload" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <FlatList
          horizontal
          data={docs}
          style={{ marginHorizontal: 30 }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => renderImage(item)}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.saveBtn} onPress={updateDetails}>
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  profileImg: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 100 / 2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    top: 30,
  },
  formContainer: {
    flex: 1,
    top: 50,
    marginHorizontal: 10,
    flexDirection: "row",
    marginBottom: 70,
  },
  inputContainer: {
    marginLeft: 30,
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 5,
    marginVertical: 10,
  },
  inputText: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderRadius: 7,
    marginVertical: 10,
    padding: 4,
    width: 180,
  },
  filesUploadStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "dashed",
    width: 100,
    height: 150,
    justifyContent: "center",
    left: 20,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    width: 80,
    justifyContent: "center",
    borderRadius: 25,
    padding: 15,
    elevation: 3,
  },
  btnContainer: {
    alignItems: "flex-end",
    right: 20,
    top: -30,
  },
  renderImageStyle: {
    borderWidth: 1,
    borderRadius: 10,
    width: 100,
    height: 150,
    marginHorizontal: 5,
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
