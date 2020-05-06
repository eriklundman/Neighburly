import * as firebase from 'firebase'

import React from 'react';
import { resolve } from 'dns';

import { toast } from "./toast";


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
//db.settings({ timestampsInSnapshots: true });

export async function loginUser(email: string, password: string) {
  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password)

    return true
  } catch (error) {
    console.log(error);
    await toast(error, 4000);

    return false
  }
}

export async function registerUser(firstname: string, lastname: string, email: string, password: string) {

  let res = firebase.auth().createUserWithEmailAndPassword(email, password).then((cred: any) => {

    db.collection('users').doc(cred.user.uid).set({
      firstname, lastname, email, radius: 5000, numb_of_ratings: 0, rating: 0
    }).catch(function (error) {
      console.error("Error adding document: ", error);

    });

    return true
  }).catch(function (error) {
    console.error("Error register user ", error);
    toast(error, 4000);
    return false
  })

  return res

}



export async function createRequest(text: string, selected: string, coords: any) {
  const chatRoomId = await createChatRoom();
  let userRef: any = firebase.auth().currentUser;
  try {
    db.collection("users").doc(userRef.uid).get().then((docu: any) => {
      if (docu !== undefined) {
        db.collection('requests').doc().set({
          receiver_id: userRef.uid, description: text, type: selected, coordinates: coords, receiver_fn: docu.data().firstname, receiver_ln: docu.data().lastname, accepted: false, completed: false, r_completed: false, h_completed: false, chatId: chatRoomId
        });
      }
    });
    return true;
  }
  catch {
    toast("Requesten skickades ej");
    return false;
  }

}

async function createChatRoom() {
   return db.collection("chats").add({
    messages: [], newMessage: "noNew",
  }).then(docRef => {
    console.log("Document written with ID: ", docRef.id);
    return docRef.id
  })
    .catch(error => console.error("Error adding document: ", error))
}

export function storeMessage(message: string, chatId: string, firstName: any) {
  let userRef: any = firebase.auth().currentUser;
  let info = { content: message, name: firstName, timeStamp: Date.now(), uId: userRef.uid };
  try {
    let chatRef = db.collection("chats").doc(chatId);
    chatRef.update({
      messages: firebase.firestore.FieldValue.arrayUnion(info), newMessage: userRef.uid
    }).then(() => {
      console.log("Message sent")
    });
  }
  catch{
    toast("Meddelandet kunde inte skickas")
  }
}

export function updateNotice(chatId : string) {

    try {
        let chatRef = db.collection("chats").doc(chatId);
        chatRef.update({
            newMessage: "noNew"
        }).then(() => {
            console.log("Notice updated")
        });
    }
    catch{
        console.log("notice update failed")
    }
}

export function getRequest() {
  let reqArr: any = []
  let requestRef = db.collection("requests")
  requestRef.get().then(snapshot => {
    snapshot.forEach(req => {

      reqArr.push({ accepted: req.data().accepted, req_id: req.id, lat: req.data().coordinates[0], lng: req.data().coordinates[1], type: req.data().type, des: req.data().description, r_fn: req.data().receiver_fn, r_ln: req.data().receiver_ln, r_id: req.data().receiver_id })
    });

  })
    .catch(err => {
      console.log('Error getting documents', err);
    });

  return reqArr
}

export function getYourRequest() {
  let userRef: any = firebase.auth().currentUser;
  let reqArr: any = [];
  let requestRef = db.collection("requests").where("helper_id", "==", userRef.uid);
  requestRef.get().then(snapshot => {
    snapshot.forEach(req => {

      reqArr.push({ accepted: req.data().accepted, req_id: req.id, lat: req.data().coordinates[0], lng: req.data().coordinates[1], type: req.data().type, des: req.data().description, r_fn: req.data().receiver_fn, r_ln: req.data().receiver_ln, chatId: req.data().chatId })
    });

  })
    .catch(err => {
      console.log('Error getting documents', err);
    });

  return reqArr
}

export function helpRequest(request_id: any) {

  let userRef: any = firebase.auth().currentUser;

  try {
    db.collection("users").doc(userRef.uid).get().then((docu: any) => {
      if (docu !== undefined) {
        db.collection('requests').doc(request_id).set({
          accepted: true, helper_fn: docu.data().firstname, helper_ln: docu.data().lastname, helper_id: userRef.uid
        }, { merge: true }).then((nada: any) => {
          toast("Changes saved")
        })
      }
    })

    return true
  }
  catch{
    toast("Requesten skickades ej")
    return false
  }
}

export function deleteRequest(request_id: any) {
  db.collection("requests").doc(request_id).delete().then(function () {
    toast("Request successfully deleted!");
  }).catch(function (error) {
    toast("Error removing request");
  });
}

export async function logoutUser() {
  return firebase.auth().signOut()
}


export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        resolve(user)
      } else {
        resolve(null)
      }
      unsubscribe()
    })
  })

}

export async function getUserInfo() {

  let userRef: any = firebase.auth().currentUser;

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

export function getUserId() {
  let userRef: any = firebase.auth().currentUser;
  if (userRef) {
    return userRef.uid;
  }
}

export async function updateDatabase(radius: any, firstname: any, lastname: any) {
  let userRef: any = firebase.auth().currentUser;

  if (userRef) {
    let user: any = userRef.uid;

    db.collection("users").doc(user).set({
      radius: radius * 1000, firstname, lastname
    }, { merge: true })
      .then(function () {
        console.log("Document successfully written!");
        toast("Changes saved")
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
        toast("Problem saving changes, check internet connection")
      });

  }
}

export function giveRating(new_rating: any, userId: any, helper: boolean) {
  
    let userData = db.collection("users").doc(userId);
    let helped: number = 0
    let received: number = 0
    if(helper === true){
      helped = 1
    }
    else if(helper === false){
      received = 1
    }

    userData.get().then((doc: any) => {
      if(doc !== undefined){
      let nr = ((doc.data().rating)*(doc.data().numb_of_ratings) + new_rating)/((doc.data().numb_of_ratings)+1)
      userData.update({
        numb_of_ratings: firebase.firestore.FieldValue.increment(1),
        rating: nr,
        have_helped: firebase.firestore.FieldValue.increment(helped),
        have_been_helped: firebase.firestore.FieldValue.increment(received)
        
      })
      }
    })
  
}






