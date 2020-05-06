import React, { useEffect, useState } from "react";
import {
  IonIcon,
  IonButton,
  IonButtons,
  IonItem,
  IonText,
  IonRow,
  IonCol,
  IonGrid,
  IonModal,
  IonBadge,
  IonCardContent,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
} from "@ionic/react";
import {
  personCircleOutline,
  chatbubblesOutline,
  checkmarkOutline,
  pawOutline,
  flowerOutline,
  helpCircleOutline,
  cartOutline,
} from "ionicons/icons";
import StarRatingComponent from "react-star-rating-component";
import { giveRating } from "../firebaseConfig"
import "./Request.css";

import * as firebase from 'firebase'

const db = firebase.firestore();



const Request: React.FC<any> = (props) => {
  const [notice, setNotice] = useState<any>();
  const [showAlert, setShowAlert] = useState(false);
  const [rating, setRating] = useState(0);
  let userRef: any = firebase.auth().currentUser;

  let icon: any;
  if (props.item.type === "shopping") {
    icon = cartOutline;
  }
  if (props.item.type === "dog-walking") {
    icon = pawOutline;
  }
  if (props.item.type === "gardening") {
    icon = flowerOutline;
  }
  if (props.item.type === "other") {
    icon = helpCircleOutline;
  }



  const onStarClick = (nextValue: number) => {
    setRating(nextValue);
  };

  useEffect(() => {


    db.collection("chats").where(firebase.firestore.FieldPath.documentId(), '==', props.item.chatId)
      .onSnapshot(function (snapshot) {

        snapshot.docChanges().forEach(function (change) {
          let lastMessage = change.doc.data().newMessage;

          if (lastMessage === userRef.uid || lastMessage === "noNew") {
            setNotice(false);
          }
          else {
            setNotice(true);
          }

        });
      });

  }, [])

  function removeNotice() {
    setNotice(false);
  }


  const doneWithRequest = () => {
    setShowAlert(false);

    let helper: boolean

    if (userRef.uid === props.item.h_id) {
      helper = false
      giveRating(rating, props.item.r_id, helper);
      db.collection("requests").doc(props.item.req_id).update({
        h_completed: true
      })
    }
    else if (userRef.uid === props.item.r_id) {
      helper = true
      giveRating(rating, props.item.h_id, helper);
      db.collection("requests").doc(props.item.req_id).update({
        r_completed: true
      })
    }
  };

  return (
    <IonCard class={props.type}>
      <IonCardHeader>

        <IonCardSubtitle>hej</IonCardSubtitle>

        {notice && <IonBadge color="danger">1</IonBadge>}
        <IonButton className="ion-chat-button" fill="clear" onClick={removeNotice} routerLink={`/chat/${props.item.chatId}`}>
          <IonIcon
            color="tertiary"
            icon={chatbubblesOutline}
            slot="icon-only"
          />
        </IonButton>



        <IonCardTitle >
          {props.item.r_fn + " " + props.item.r_ln}

        </IonCardTitle>


      </IonCardHeader>



      <IonCardContent>

        <IonItem lines="none" className="ion-no-padding">
          <IonIcon slot="start" color="tertiary" icon={icon} />
          {props.item.des}

          {props.item.r_completed === false && userRef.uid === props.item.r_id ?

            <IonButtons slot="end" >
              <IonButton onClick={() => setShowAlert(true)}>
                <IonIcon
                  color="success"
                  icon={checkmarkOutline}
                  slot="icon-only"
                />
              </IonButton>
            </IonButtons>
            
            : props.item.h_completed === false && userRef.uid === props.item.h_id ?
              <IonButtons slot="end" >
                <IonButton onClick={() => setShowAlert(true)}>
                  <IonIcon
                    color="success"
                    icon={checkmarkOutline}
                    slot="icon-only"
                  />
                </IonButton>
              </IonButtons>
              : console.log()

          }

        </IonItem>
      </IonCardContent>


      <IonModal isOpen={showAlert} onDidDismiss={() => setShowAlert(false)}>
        <IonRow className="ion-text-center">
          <IonCol>
            <h1>Are you sure the request is done?</h1>
            <p>Rate the person</p>
          </IonCol>
        </IonRow>
        <IonRow className="ion-text-center">
          <IonCol>
            <div style={{ fontSize: 45 }}>
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={rating}
                onStarClick={onStarClick}
                starColor="#194afb"
                emptyStarColor="#bbd0ff"
              />
            </div>
          </IonCol>
        </IonRow>

        <p>{rating}</p>
        <IonButtons>
          <IonButton onClick={() => setShowAlert(false)}>Cancel</IonButton>
          <IonButton onClick={() => doneWithRequest()}>Save</IonButton>
        </IonButtons>
      </IonModal>

    </IonCard>
  );
};

export default Request;
