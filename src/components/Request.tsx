import React, {useEffect, useState} from "react";
import {
  IonIcon,
  IonButton,
  IonButtons,
  IonItem,
  IonText,
  IonRow,
  IonCol,
  IonBadge,
  IonGrid,
  IonAlert,
  IonModal,
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
import "./Request.css";
import * as firebase from 'firebase'
const db = firebase.firestore();


const Request: React.FC<any> = (props) => {
    const [notice, setNotice] = useState<any>();
    const [showAlert, setShowAlert] = useState(false);
    const [rating, setRating] = useState(0);

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
        let userRef : any = firebase.auth().currentUser;

        db.collection("chats").where(firebase.firestore.FieldPath.documentId(), '==', props.item.chatId)
            .onSnapshot(function(snapshot) {

                snapshot.docChanges().forEach(function(change) {
                    let lastMessage = change.doc.data().newMessage;
                    console.log("New message: ", lastMessage);
                    if (lastMessage === userRef.uid || lastMessage === "noNew") {
                        setNotice(false);
                    }
                    else {
                        setNotice(true);
                    }

                });
            });

    },[])

    function removeNotice() {
        setNotice(false);
    }


  const doneWithRequest = () => {
    setShowAlert(false);
  };

  return (
    <IonItem class={props.type}>
      <IonGrid>
        <IonRow>
          <IonCol>
            {" "}
            <div className="ion-align-self-start">
              <IonIcon
                color="tertiary"
                icon={personCircleOutline}
                size="large"
                slot="start"
              />
              <IonText slot="end">
                {props.item.r_fn + " " + props.item.r_ln}
              </IonText>
            </div>
          </IonCol>

          <IonCol>
            <div className="ion-float-right">
              <IonButtons>
                {notice && <IonBadge color="danger">1</IonBadge>}
                <IonButton onClick={removeNotice} routerLink={`/chat/${props.item.chatId}`}>
                  <IonIcon
                    color="tertiary"
                    icon={chatbubblesOutline}
                    slot="icon-only"
                  />
                </IonButton>
              </IonButtons>
            </div>
          </IonCol>

        </IonRow>

        <IonRow>
          <IonCol>
            <div className="ion-align-self-start">
              <IonIcon color="tertiary" icon={icon} />
              {props.item.des} {props.type}
            </div>
          </IonCol>
          <IonCol>
            <div className="ion-float-right">
              <IonButtons>
                <IonButton onClick={() => setShowAlert(true)}>
                  <IonIcon
                    color="success"
                    icon={checkmarkOutline}
                    slot="icon-only"
                  />
                </IonButton>
              </IonButtons>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
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
    </IonItem>
  );
};

export default Request;
