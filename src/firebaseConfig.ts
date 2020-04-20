import * as firebase from 'firebase'
import { constructOutline } from 'ionicons/icons';

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
db.settings({ timestampsInSnapshots: true });

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

  firebase.auth().createUserWithEmailAndPassword(email, password).then((cred: any) => {
    db.collection('users').doc(cred.user.uid).set({
      firstname, lastname
    }).catch(function (error) {
      console.error("Error adding document: ", error);
    });
  })

}



export function setUpProfile() {
  
var user = firebase.auth().currentUser;

    if (user != null) {
      user.providerData.forEach(function(profile){
        console.log("mail: " + profile?.email)
        let thing = document.getElementById('profcont') as any
        thing.innerText = profile?.email
      })
    }
    else {
      console.log("inte inloggad antar jag")
    }

}

