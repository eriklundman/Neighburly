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
      firstname, lastname, email
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





/*export const setUpProfile = () => {

  var user = firebase.auth().currentUser;

  if (user != null) {
    user.providerData.forEach(function (profile) {
      let mail = profile?.email
      console.log(mail)
      return mail
    })
  }
  else {
    let error = "ej inloggad" as string
    return error

  }

}*/

/*export async function setUpProfile() {

  var user = firebase.auth().currentUser;
  
  if (user != null) {
    db.collection('users').doc(user.uid).onSnapshot(doc => {
      var fn = doc.data()?.firstname;
      console.log(fn)
      return fn
    })
    
  }
  else {
    let error = "ej inloggad" as string
    return error

  }

}*/
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

