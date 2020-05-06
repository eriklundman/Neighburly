import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonRow,
  IonCol,
} from "@ionic/react";
import "./ProfileTab.css";
import Profile from "../components/Profile";
import HeaderLogga from "../components/HeaderLogga";
import SettingsBtn from "../components/EditProfile";
import StarRatingComponent from 'react-star-rating-component';
import * as firebase from 'firebase'

const db = firebase.firestore();

const ProfileTab: React.FC = () => {
  const [mode, setMode] = useState("");
  
  const [stars, setStars] = useState(3)
  const [helps, setHelps] = useState(0)
  const [receives, setReceives] = useState(0)

  useEffect(() => {
    let userRef : any = firebase.auth().currentUser;
   
    db.collection("users").doc(userRef.uid).onSnapshot((snapshot: any) => {
      //setUserRating(snapshot.data().rating)
      setStars(snapshot.data().rating+0.5)
      setHelps(snapshot.data().have_helped)
      setReceives(snapshot.data().have_been_helped)
      setMode("You have helped " + snapshot.data().have_helped + " person(s)")
      
    })
  }, []);


  return (
    <IonPage>
          <HeaderLogga />

      <Profile />
      <IonContent>
        <IonRow>
        
          <IonCol className="ion-text-center">
            <div style={{fontSize:45}}>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={stars}
          editing={false}
          starColor="#194afb"
          emptyStarColor="#bbd0ff"
        />
        </div>
        </IonCol>

        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol className="ion-text-center">
            <p>{mode}</p>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>

        <IonRow>
          <IonCol></IonCol>
          <IonCol>
            <SettingsBtn />
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
      </IonContent>

      <IonRow className="ion-align-items-stretch">
        <IonSegment
          onIonChange={(e) => console.log("Segment selected", e.detail.value)}
        >
          <IonSegmentButton
            onClick={() =>
              setMode(
                "You have helped " + helps + " person(s)"
              )
            }
            value="helper"
          >
            <IonLabel color="secondary">Helper</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            onClick={() =>
              setMode(
                "You have been helped " + receives + " time(s)"
                )
            }
            value="receiver"
          >
            <IonLabel color="secondary">Receiver</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonRow>
    </IonPage>
  );
};

export default ProfileTab;
