import React, { useEffect, useState } from "react";
import {
  IonIcon,
  IonButton,
  IonButtons,
  IonItem,
  IonRow,
  IonCol,
  IonModal,
  IonBadge,
  IonCardContent,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonContent,
} from "@ionic/react";
import {
  personCircleOutline,
  chatbubblesOutline,
  checkmarkOutline,
  pawOutline,
  flowerOutline,
  helpCircleOutline,
  cartOutline,
  trashOutline,
} from "ionicons/icons";
import StarRatingComponent from "react-star-rating-component";
import { giveRating } from "../firebaseConfig"
import "./Request.css";

import * as firebase from "firebase";

const db = firebase.firestore();

const Request: React.FC<any> = (props) => {

  const [notice, setNotice] = useState<any>();
  const [showAlert, setShowAlert] = useState(false);
  const [rating, setRating] = useState(0);
  let userRef: any = firebase.auth().currentUser;
  let type = props.type;
  const [name, setName] = useState<any>();
  const [text, setText] = useState<any>();


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
      displayLayout();
        let userRef : any = firebase.auth().currentUser;

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

      db.collection("requests").doc(props.item.req_id).onSnapshot((snapshot: any) => {
        
        if (snapshot.data().h_completed === true && snapshot.data().r_completed === true){
          db.collection("requests").doc(props.item.req_id).update({
            completed: true
          })
        }


      })

  }, []);

  function displayLayout() {
    if (type === "youWillHelp") {setText("Helping");
      setName(props.item.r_fn + " " + props.item.r_ln);
    }
    if (type === "helpingYou") {
      setText("Being helped by");
      setName(props.item.h_fn + " " + props.item.h_ln)
    }
    if (type === "iHelped") {
      setText("You have helped");
      setName(props.item.r_fn + " " + props.item.r_ln);
    }
    if (type === "beenHelped") {
      setText("Been helped by");
      setName(props.item.h_fn + " " + props.item.h_ln);
    }
  }

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
    <IonCard  class={props.type}>
      <IonCardHeader>
        <IonCardSubtitle className={props.type} >{text}</IonCardSubtitle>
    
        {notice && <IonBadge className="chatt-badge" color="danger">1</IonBadge>}
        <IonButton fill="clear" className="ion-chat-button" onClick={removeNotice} routerLink={`/chat/${props.item.chatId}`}>
          <IonIcon
              color="tertiary"
              icon={chatbubblesOutline}
              slot="icon-only"
          />
        </IonButton>
     
      <IonCardTitle >
        {name}
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
            <h4 className="info-text">Rate {name} by clicking on the stars!</h4>
          </IonCol>
        </IonRow>
        <IonRow className="ion-text-center">
          <IonCol>
            <div  className="rating-design"
            style={{ fontSize: 45 }}>
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
        <IonButtons>
          <IonButton className="cancel-button"color="secondary" fill="outline" onClick={() => setShowAlert(false)}>Cancel</IonButton>
          <IonButton onClick={() => doneWithRequest()}>Done!</IonButton>
        </IonButtons>
      </IonModal>
      </IonCard>

    
  );
};

export default Request;
