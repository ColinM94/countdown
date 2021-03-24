import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBXeVexU8ZvhXTiVLBCtfz9dzRAdStri6U",
    authDomain: "countdown-d22ce.firebaseapp.com",
    projectId: "countdown-d22ce",
    storageBucket: "countdown-d22ce.appspot.com",
    messagingSenderId: "195247588958",
    appId: "1:195247588958:web:d7418e146fbb623d3a96cf"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.firestore()