import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonRow,
  IonHeader,
  IonImg,
  IonToolbar,
  IonChip,

} from "@ionic/react";
import "./ProfileTab.css";
import Profile from "../components/Profile";
import SettingsBtn from "../components/EditProfile";
import StarRatingComponent from "react-star-rating-component";
import * as firebase from "firebase";

const db = firebase.firestore();

const ProfileTab: React.FC = () => {
  const [value, setValue] = useState<any>("helper");
  const [stars, setStars] = useState(3);
  const [helps, setHelps] = useState(0);
  const [receives, setReceives] = useState(0);
  const [score, setScore] = useState(0);
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");

  useEffect(() => {
    let userRef: any = firebase.auth().currentUser;
    db.collection("users")
      .doc(userRef.uid)
      .onSnapshot((snapshot: any) => {

        if (snapshot.data()) {
          setStars(snapshot.data().rating + 0.5);
          setHelps(snapshot.data().have_helped);
          setReceives(snapshot.data().have_been_helped);
          setScore(snapshot.data().score);
          setFn(snapshot.data().firstname);
          setLn(snapshot.data().lastname);
        }
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="header-toolbar">
          <IonImg className="loggan-profile" src="assets/icon/logga3.png">
          </IonImg>
        </IonToolbar>
      </IonHeader>

      <IonRow className="ion-align-items-stretch">
        <IonSegment className="segment-profile"
          value={value}
          onIonChange={(e) => setValue(e.detail.value)}
        >
          <IonSegmentButton value="helper">
            <IonLabel color="secondary">Helper</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="receiver"
          >
            <IonLabel color="secondary">Receiver</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonRow>
      <IonContent scrollY={false}>
        <div className="profile-grid">
          <div>
            <Profile fn={fn} ln={ln} />
          </div>

          <div className="text-design">
            <h6>Score</h6>
            <IonChip color="success" className="score-badge">
              {Math.round(score)}
            </IonChip>
          </div>

          <div className="text-design">
            <h6 className="rate-text">Rating</h6>
            <div style={{ fontSize: 40 }}>
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={stars}
                editing={false}
                starColor="#194afb"
                emptyStarColor="#bbd0ff"
              />
            </div>
          </div>

          <div className="info-text">
            {value === "helper" ? (
              <div>
                <h6>You have helped</h6>
                <IonChip color="secondary" className="score-badge">
                {helps}
                </IonChip>
                <h6>people</h6>            
              </div>
            ) : (
              
              <div>
                <h6>You have been helped</h6>
                <IonChip color="secondary" className="score-badge">
                {receives}
                </IonChip>
                <h6>times</h6>
              </div>
            )}
          </div>
          <div>
              <SettingsBtn />
            </div>
         
        </div>
      </IonContent>

    </IonPage>
  );
};

export default ProfileTab;
