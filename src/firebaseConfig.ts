import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCjzRHhY9FAUQ0yoxWN9pKF3MwDtGrtRdw",
  authDomain: "neighburly.firebaseapp.com",
  databaseURL: "https://neighburly.firebaseio.com",
  projectId: "neighburly",
  storageBucket: "neighburly.appspot.com",
  messagingSenderId: "615881322761",
  appId: "1:615881322761:web:169939d398d7b0155263d8",
  measurementId: "G-X8Y1CVKP6Y"
};

firebase.initializeApp(config);
const db = firebase.firestore();

export async function loginUser(email: string, password: string) {
  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password)
    console.log(res)

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function registerUser(firstname: string, lastname: string, email: string, password: string) {

  firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
          db.collection('users').doc(email).set({
            firstname, lastname
          }).catch(function(error) {
            console.error("Error adding document: ", error);
          });
})

}
