import React, { useState } from "react";
import {
  IonContent,
  IonGrid,
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


const ProfileTab: React.FC = () => {
  const [mode, setMode] = useState("You have helped (antal) persons");
  const [userRating, setUserRating] = useState(3);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <HeaderLogga />
        </IonToolbar>
      </IonHeader>

      <Profile />
      <IonContent>
        <IonRow>
        
          <IonCol className="ion-text-center">
            <div style={{fontSize:45}}>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={userRating}
          editing={false}
          starColor="#194afb"
          emptyStarColor="#001e57"
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
            <IonLabel color="tertiary">Helper</IonLabel>
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
            <IonLabel color="tertiary">Receiver</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonRow>
    </IonPage>
  );
};

export default ProfileTab;
