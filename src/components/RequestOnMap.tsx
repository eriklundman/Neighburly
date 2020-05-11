import React, { useState, useEffect } from "react";
import {
  IonIcon,
  IonButton,
  IonButtons,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonPopover,
  IonAlert,
} from "@ionic/react";
import {
  personCircleOutline,
  pawOutline,
  flowerOutline,
  helpCircleOutline,
  cartOutline,
  heart,
  trashOutline,
} from "ionicons/icons";
import "./Request.css";
import { helpRequest, deleteRequest } from "../firebaseConfig";
import StarRatingComponent from "react-star-rating-component";
import * as firebase from "firebase";

const db = firebase.firestore();


const RequestOnMap: React.FC<any> = (props) => {
  const [stars, setStars] = useState(3);
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    db.collection("users")
      .doc(props.item.r_id)
      .onSnapshot((snapshot: any) => {
        setStars(snapshot.data().rating + 0.5);
      })
  },[]);

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

  return (
    <IonCard>
      <IonCardHeader>
        {props.userId !== props.item.r_id ? (
          <div className="profile-name-request">
            <IonIcon
              slot="end"
              size="large"
              color="tertiary"
              icon={personCircleOutline}
            />
            <IonButton
              fill="clear"
              color="tertiary"
              onClick={(e) =>
                setShowPopover({ open: true, event: e.nativeEvent })
              }
            >
              <h3 color="tertiary">
                {props.item.r_fn + " " + props.item.r_ln[0]}
              </h3>
            </IonButton>
          </div>
        ) : (
          <h3 color="tertiary">Your Own Request</h3>
        )}
      </IonCardHeader>

      <IonPopover
              css-class="ion-popover"
              animated={true}
              isOpen={showPopover.open}
              event={showPopover.event}
              onDidDismiss={(e) =>
                setShowPopover({ open: false, event: undefined })
              }
            >
                <div className="profile-name-request">
            <IonIcon
              slot="end"
              size="large"
              color="tertiary"
              icon={personCircleOutline}
            />
              {props.item.r_fn + " " + props.item.r_ln}
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={stars}
                editing={false}
                starColor="#194afb"
                emptyStarColor="#bbd0ff"
              />
              </div>
            </IonPopover>

      <IonCardContent>
        <IonItem lines="none">
          <IonIcon slot="start" color="tertiary" icon={icon} />
          {props.item.des}

          {props.userId !== props.item.r_id ? (
            <IonButtons slot="end">
              <IonButton
                color="secondary"
                shape="round"
                onClick={() => setShowAlert(true)}
              >
                <IonIcon
                  slot="start"
                  color="secondary"
                  icon={heart}
                  size="large"
                />
                Help
              </IonButton>
            </IonButtons>
          ) : (
            <IonButtons slot="end">
              <IonButton
                color="danger"
                shape="round"
                onClick={() => deleteRequest(props.item.req_id)}
              >
                <IonIcon
                  slot="start"
                  color="danger"
                  icon={trashOutline}
                  size="large"
                />
                Delete
              </IonButton>
            </IonButtons>
          )}
        </IonItem>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Help " +  props.item.r_fn + "!"}
          message={"Do you want to help " + props.item.r_fn + "?"}
          buttons={[{text:'Cancel', cssClass:'alert-buttons'}, 
          {text:'Help', 
          cssClass: 'alert-buttons',
          handler: () => {
            helpRequest(props.item.req_id);
          }}]}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default RequestOnMap;
