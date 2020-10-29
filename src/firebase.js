import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDZBejbmZ1epkESWGFpAxCg4WJNUXiwZNA",
    authDomain: "discord-clone-redux-a5bc7.firebaseapp.com",
    databaseURL: "https://discord-clone-redux-a5bc7.firebaseio.com",
    projectId: "discord-clone-redux-a5bc7",
    storageBucket: "discord-clone-redux-a5bc7.appspot.com",
    messagingSenderId: "383880653576",
    appId: "1:383880653576:web:4f0ec9a699d34ee1b95abd",
    measurementId: "G-TN0VH4MPD1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth ,provider};
export default db;
