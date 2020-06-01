import * as firebase from 'firebase'
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

/*
const messaging = firebase.messaging();
messaging.usePublicVapidKey("BBQDvD44v3X4l-6oyaRrQ9nK9uF6fut2F1It0JDnOZ7LJK-rPkA77kN3zP9GwBtQ-nm_6rntSL1MnrhDrUURNwc");
//db.settings({ timestampsInSnapshots: true });
messaging.requestPermission()
    .then(() => {
      console.log("have permission")
      return messaging.getToken()
    })
    .then(token => {
        console.log("Token: ", token)
      console.log("hej")
    })
    .catch(function(err) {
      console.log("Error occured", err)
    })
messaging.onMessage(function(payload) {
  console.log("onMessage: ", payload)
})
*/




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
      firstname, lastname, email, radius: 5000, numb_of_ratings: 0, rating: 0, have_helped: 0, have_been_helped: 0, score: 0
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

export function sendVerEmail(){
  let user: any = firebase.auth().currentUser;
  if (user){
    user.sendEmailVerification().then(function() {
      console.log("Email sent")
    }).catch(function(error: any) {
      console.log(error);
    });
  }
  else{
    toast("inte inloggad")
  }

}


export async function createRequest(text: string, selected: string, coords: any) {
  let userRef: any = firebase.auth().currentUser;

  try {
    db.collection("users").doc(userRef.uid).get().then((docu: any) => {
      if (docu !== undefined) {
        db.collection('requests').doc().set({
          receiver_id: userRef.uid, description: text, type: selected, coordinates: coords, receiver_fn: docu.data().firstname, receiver_ln: docu.data().lastname, accepted: false, completed: false, r_completed: false, h_completed: false, r_deleted: false, h_deleted: false
        });
      }
    });
    return true;
  }
  catch {
    toast("Failed to make request, make sure you have an internet connection", 4000);
    return false;
  }

}

async function createChatRoom(uid: any) {
  return db.collection("chats").add({
    messages: [], newMessage: "noNew"
  }).then(docRef => {
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


export function updateNotice(chatId: string) {

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

export async function waitForAcceptRequest(request_id : any) {
  let userRef: any = firebase.auth().currentUser;

  try {
    db.collection("users").doc(userRef.uid).get().then((docu: any) => {
      if (docu !== undefined) {
        let reqRef = db.collection('requests')
        reqRef.doc(request_id).set({
          helper_fn: docu.data().firstname, helper_ln: docu.data().lastname, helper_id: userRef.uid, noticeHelper: false
        }, { merge: true }).then((nada: any) => {
          toast("Waiting for other person to accept")

        })
      }
    })
  }
  catch{
    toast("Error could not accept request")
  }
}

export function cancelRequest(request_id : any) {
  let reqRef = db.collection('requests').doc(request_id);

// Remove the 'capital' field from the document
  reqRef.update({
    helper_fn: firebase.firestore.FieldValue.delete(), helper_ln: firebase.firestore.FieldValue.delete(), helper_id: firebase.firestore.FieldValue.delete(), noticeHelper: firebase.firestore.FieldValue.delete()
  }).then(() => {
    toast("Request canceled")
  });
}

export function removeNoticeHelper (request_id : any) {
  let reqRef = db.collection('requests').doc(request_id);

// Remove the 'capital' field from the document
  reqRef.update({
    noticeHelper: firebase.firestore.FieldValue.delete()
  }).then(() => {

  });
}

export async function helpRequest(request_id: any) {

  let userRef: any = firebase.auth().currentUser;
  const chatRoomId = await createChatRoom(userRef.uid);

  try {
    db.collection("users").doc(userRef.uid).get().then((docu: any) => {
      if (docu !== undefined) {
        let reqRef = db.collection('requests')
        reqRef.doc(request_id).set({
          accepted: true, chatId: chatRoomId, timeStamp: Date.now()
        }, { merge: true }).then((nada: any) => {
          toast("Request accepted")

        })

        reqRef.doc(request_id).get().then((req: any) => {
          db.collection("chats").doc(req.data().chatId).update({
            participants: [req.data().helper_id, req.data().receiver_id],
            names: [req.data().helper_fn, req.data().receiver_fn]
          }).then(nada => {

          })
        })
      }
    })



    return true
  }
  catch{
    toast("Error could not accept request")
    return false
  }
}

export function deleteRequest(request_id: any) {
  db.collection("requests").doc(request_id).delete().then(function () {

  }).catch(function (error) {

  });
}

export function deleteActiveRequest(request_id : any, chatId : any) {
  db.collection("chats").doc(chatId).delete().then(function () {
    deleteRequest(request_id);
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
        console.log("No such document or logged in as Admin!");


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
  if (helper === true) {
    helped = 1
  }
  else if (helper === false) {
    received = 1
  }
if(userData){
  userData.get().then((doc: any) => {
    if (doc !== undefined) {
      let nr = ((doc.data().rating) * (doc.data().numb_of_ratings) + new_rating) / ((doc.data().numb_of_ratings) + 1)

      let new_have_helped = doc.data().have_helped + helped
      let new_have_been_helped = doc.data().have_been_helped + received

      userData.update({
        numb_of_ratings: firebase.firestore.FieldValue.increment(1),
        rating: nr,
        have_helped: new_have_helped,
        have_been_helped: new_have_been_helped,
        score: (new_have_helped * nr) + new_have_been_helped
      })
    }
  })
}
}


export function deleteAccount() {
  let userRef: any = firebase.auth().currentUser;
  if (userRef) {
    db.collection("users").doc(userRef.uid).delete().then(function () {
      toast("User account successfully deleted!");
    }).catch(function (error) {
      toast("Error deleting user account");
    });

    userRef.delete()
  }
}


export function newPw(new_password: string) {
  var user: any = firebase.auth().currentUser;
  user.updatePassword(new_password).then(function () {
    console.log("nytt lösenord")
  }).catch(function (error: any) {
    console.log(error)
  });

}

export function reportUserFunc(reported_id: any, incident: string, why: string, req_id: string, selected: string) {
  db.collection("reports").add({
    incident: incident, why_inappropriate: why, request_id: req_id, reported_user_id: reported_id, type: selected
  }).catch(function(error: any){
    console.log(error)
  })
  
}

export function blockUser(reported_id: string){
  
  db.collection("users").doc(reported_id).get().then((blocked_user: any)=>{
    
    db.collection("blocked_users").doc(reported_id).set({
      blocked_email: blocked_user.data().email , blocked_firstname: blocked_user.data().firstname, blocked_lastname: blocked_user.data().lastname
    }).catch(function(error: any){
      console.log(error)
    })

  }).catch(function(error: any){
      console.log(error)
    })

}

export function unBlockUser(reported_id: string){

 
    db.collection("blocked_users").doc(reported_id).delete().then(function () {
      toast("User unblocked successfully!");
    }).catch(function (error) {
      toast("Error unblocking user");
    });

}

export function deleteReport(id: string){
  db.collection("reports").doc(id).delete().then(function(){
    toast("Report successfully deleted!")
  }).catch(function (error) {
    toast("Error deleting report: " + error);
  });
}


