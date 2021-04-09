// The core firebase client.
import firebase from 'firebase/app'

// Importing the required individual services. 
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

export const app = firebase.initializeApp({
    apiKey: "AIzaSyBXeVexU8ZvhXTiVLBCtfz9dzRAdStri6U",
    authDomain: "countdown-d22ce.firebaseapp.com",
    projectId: "countdown-d22ce",
    storageBucket: "countdown-d22ce.appspot.com",
    messagingSenderId: "195247588958",
    appId: "1:195247588958:web:d7418e146fbb623d3a96cf"
})

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()

// Types
export type Doc = firebase.firestore.DocumentSnapshot
export type DocData = firebase.firestore.DocumentData | undefined