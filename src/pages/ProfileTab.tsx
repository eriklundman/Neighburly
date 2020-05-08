import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
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
import StarRatingComponent from "react-star-rating-component";
import * as firebase from "firebase";

const db = firebase.firestore();

const ProfileTab: React.FC = () => {
 

  const [value, setValue] = useState("helper");

  const [stars, setStars] = useState(3);
  const [helps, setHelps] = useState(0);
  const [receives, setReceives] = useState(0);

  useEffect(() => {
    let userRef: any = firebase.auth().currentUser;

    db.collection("users")
      .doc(userRef.uid)
      .onSnapshot((snapshot: any) => {
        if(snapshot.data()){
        setStars(snapshot.data().rating + 0.5);
        setHelps(snapshot.data().have_helped);
        setReceives(snapshot.data().have_been_helped);
        }
      });
  }, []);

  return (
    <IonPage>
          <HeaderLogga />
          <IonContent>

      <Profile />
      <p className="your-rating-text">Your rating</p>
        <IonRow>
          <IonCol className="ion-text-center">
            <div style={{ fontSize: 45 }}>
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
          <IonCol size="1"></IonCol>
          <IonCol className="ion-text-center">
            {value === "helper" ? (
              <div>
                <p>You have helped</p>
                <h2>{helps}</h2>
                <p>people</p>
              </div>
            ) : (
              <div>
                <p>You have been helped</p>
                <h2>{receives}</h2>
                <p>times</p>
              </div>
            )}
          </IonCol>

          <IonCol size="1"></IonCol>
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
          value={value}
          onIonChange={(e) => console.log("Segment selected", e.detail.value)}
        >
          <IonSegmentButton onClick={() => setValue("helper")} value="helper">
            <IonLabel color="secondary">Helper</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            onClick={() => setValue("receiver")}
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
