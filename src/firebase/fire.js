import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBHwHg1maQJ0FCsV5thmdSf-lrQI63AFCU",
  authDomain: "auto-app-afee2.firebaseapp.com",
  databaseURL: "https://auto-app-afee2.firebaseio.com",
  projectId: "auto-app-afee2",
  storageBucket: "auto-app-afee2.appspot.com",
  messagingSenderId: "80329658169",
  appId: "1:80329658169:web:f60e0bef035b504d5ce2e8",
  measurementId: "G-64CHTML1CL",
};

firebase.initializeApp(firebaseConfig);

// const Image = async (uri, id, auto_num, folder) => {
//   const response = await fetch(uri);
//   const blob = await response.blob();
//   const snapshot = await firebase
//     .storage()
//     .ref()
//     .child(`images/${id + "-" + auto_num}/${folder}/${auto_num}`)
//     .put(blob)
//     .then(() => console.log("image_success"))
//     .catch((err) => console.log("error", err));
//   console.log(snapshot.downloadURL);
// };
export default Fire;
