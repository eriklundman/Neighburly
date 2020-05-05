import React, { useState } from "react";
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
import "./Request.css";
import StarRatingComponent from 'react-star-rating-component';

const Request: React.FC<any> = (props) => {
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

  const [showAlert, setShowAlert] = useState(false);
  const [rating, setRating] = useState(0);

  const onStarClick = (nextValue: any) => {
    setRating(nextValue);
  }

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
                <IonButton routerLink={`/chat/${props.item.chatId}`}>
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
      <IonModal
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}

      >
          <IonRow>
              <IonCol/>
              <IonCol>
        <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={onStarClick}
          starColor="#194afb"
          emptyStarColor="#001e57"
        />
        </IonCol>
        <IonCol/>
        </IonRow>

        <p>{rating}</p>
        <IonButtons>
        <IonButton onClick={() => setShowAlert(false)}>Close Modal</IonButton>
        <IonButton onClick={() => setShowAlert(false)}>Save</IonButton>
        </IonButtons>
      </IonModal>
    </IonItem>
  );
};

export default Request;
