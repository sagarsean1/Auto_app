import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import * as Linking from "expo-linking";
import ProfileImageDisplay from "../components/ProfileImageDisplay";
import Colors from "../constants/Colors";
import DisplayData from "../components/DisplayData";
import HeaderButton from "../components/HeaderButton";
import * as firebase from "firebase";
const DriverDetailScreen = ({ navigation, route }) => {
  const [key, setKey] = useState(route.params.key);
  const [data, setData] = useState({});
  navigation.setOptions({
    headerRight: () => (
      <HeaderButton name="edit" data={data} id={route.params.key} />
    ),
  });
  const [isDeleteing, setIsDeleting] = useState(false);
  useEffect(() => {
    getDetails(key);
  }, []);
  const getDetails = (key) => {
    const autoRef = firebase.database().ref().child(key);
    const autoResult = autoRef.on("value", (dataSnapshot) => {
      if (dataSnapshot.val()) {
        setData(dataSnapshot.val());
      }
    });
  };
  const callAction = (phone) => {
    let phoneNum = phone;
    if (Platform.OS === "android") {
      phoneNum = `tel:${phone}`;
    } else {
      phoneNum = `telpromt:${phone}`;
    }
    Linking.canOpenURL(phoneNum)
      .then((supported) => {
        if (!supported) {
          Alert.alert("phone no ");
        } else {
          return Linking.openURL(phoneNum);
        }
      })
      .catch((error) => console.log("phone error ", erro));
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
  const deleteDetails = async (key) => {
    Alert.alert(
      "Delete Auto ?",
      `${data.auto_num}`,
      [
        {
          text: "cancel",
          onPress: () => {
            console.log("cancel");
          },
        },
        {
          text: "OK",
          onPress: async () => {
            setIsDeleting(true);
            let detailsRef = firebase.database().ref().child(key);
            if (data.driver_img !== "empty")
              await deleteImages(data.driver_img);
            if (data.driver_proofs !== "empty") {
              for (let ind = 0; ind < data.driver_proofs.length; ind++) {
                await deleteImages(data.driver_proofs[ind]);
              }
            }

            await detailsRef.remove((error) => {
              if (!error) {
                setIsDeleting(false);
                navigation.goBack();
              } else {
                console.log(error);
              }
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {isDeleteing ? (
        <Modal transparent={true} animationType={"none"} visible={isDeleteing}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator size="large" animating={isDeleteing} />
            </View>
          </View>
        </Modal>
      ) : null}
      <ProfileImageDisplay
        profileImg={data.driver_img}
        auto_num={data.auto_num}
      />

      <DisplayData
        data={data}
        key={key}
        callAction={(phone) => callAction(phone)}
      />
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteDetails(key)}
      >
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DriverDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    marginTop: 80,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white,
    elevation: 5,
  },
  deleteBtn: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: "#FF3031",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    position: "absolute",
    bottom: 20,
    elevation: 5,
    right: 20,
  },
  btnText: {
    color: "#fff",
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
