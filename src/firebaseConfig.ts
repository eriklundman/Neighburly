import * as firebase from 'firebase'

import React, { useState } from 'react';
import { resolve } from 'dns';

import {toast} from "./toast";


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
    console.log(error);
    await toast(error, 4000);

    return false
  }
}

export async function registerUser(firstname: string, lastname: string, email: string, password: string) {

  let res = firebase.auth().createUserWithEmailAndPassword(email, password).then((cred: any)  => {

    db.collection('users').doc(cred.user.uid).set({
      firstname, lastname, email, radius: 5000
    }).catch(function(error) {
      console.error("Error adding document: ", error);

    });

    return true
  }).catch(function(error) {
    console.error("Error register user ", error);
    toast(error, 4000);
    return false
  })

  return res

}
export async function logoutUser() {
  return firebase.auth().signOut()

}


export function getCurrentUser() {
  return new Promise((resolve,reject)=> {
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        resolve(user)
      }else {
        resolve(null)
      }
      unsubscribe()
    })
  })
  
}

export async function getUserInfo() {

  let userRef : any = firebase.auth().currentUser;

  if (userRef) {
    let user: any = userRef.uid;
    let docRef = db.collection("users").doc(user);


    return docRef.get().then(function (doc) {
      if (doc.exists) {
        //console.log("Document data:", doc.data());
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");


      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    }
  }

  export async function updateDatabase(radius : any) {
    let userRef: any = firebase.auth().currentUser;

    if (userRef) {
      let user: any = userRef.uid;


      db.collection("users").doc(user).set({
        radius: radius*1000
      }, {merge: true})
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });

    }
  }







