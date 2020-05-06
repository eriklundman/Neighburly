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
  const [mode, setMode] = useState("You have helped (antal) persons");
  //const [userRating, setUserRating] = useState(3);
  const [stars, setStars] = useState(3)

  useEffect(() => {
    let userRef : any = firebase.auth().currentUser;
   
    db.collection("users").doc(userRef.uid).onSnapshot((snapshot: any) => {
      //setUserRating(snapshot.data().rating)
      setStars(snapshot.data().rating+0.5)
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
                mode === "You have helped (antal) persons"
                  ? "You have helped (antal) persons"
                  : "You have helped (antal) persons"
              )
            }
            value="helper"
          >
            <IonLabel color="secondary">Helper</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            onClick={() =>
              setMode(
                mode === "You have helped (antal) persons"
                  ? "You have been helped by(antal) persons"
                  : "You have been helped by(antal) persons"
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
