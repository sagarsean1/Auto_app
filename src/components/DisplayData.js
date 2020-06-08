import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const DisplayData = ({ data, callAction }) => {
  const navigation = useNavigation();
  const renderImage = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Image", {
            imageUri: item,

            headerName: "Document Image",
          })
        }
        style={{ elevation: 5 }}
      >
        <Image style={styles.renderImageStyle} source={{ uri: item }} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, bottom: 40 }}>
      <View style={styles.dataContainer}>
        <View style={{ marginLeft: 20 }}>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Feather name="user" size={25} style={{ marginRight: 10 }} />
            <Text style={styles.textSyle}>Name</Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Feather name="phone" size={25} style={{ marginRight: 10 }} />
            <Text style={styles.textSyle}>Phone</Text>
          </View>
        </View>
        <View style={{ marginRight: 70 }}>
          <Text style={styles.dataStyle}>{data.driver_name} </Text>
          <TouchableOpacity onPress={() => callAction(data.driver_phone)}>
            <Text style={styles.dataStyle}>{data.driver_phone} </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginLeft: 20 }}>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={25}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.textSyle}>Docs</Text>
        </View>

        {data.driver_proofs === "empty" ? (
          <Text style={{ top: 20, left: 40, fontSize: 20 }}>No Docs</Text>
        ) : (
          <FlatList
            data={data.driver_proofs}
            horizontal
            keyExtractor={(item) => item}
            renderItem={({ item }) => renderImage(item)}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 20 }}
          />
        )}
      </View>
    </View>
  );
};

export default DisplayData;

const styles = StyleSheet.create({
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dataStyle: {
    fontSize: 18,
    marginVertical: 10,
  },
  renderImageStyle: {
    borderWidth: 1,
    borderRadius: 10,
    width: 100,
    height: 150,
    marginHorizontal: 5,
  },
});
