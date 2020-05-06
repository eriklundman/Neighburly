import React from "react";
import {
  IonIcon,
  IonButton,
  IonButtons,
  IonItem,
  IonText,
  IonRow,
  IonCol,
  IonGrid,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import {
  personCircleOutline,
  checkmarkDoneOutline,
  pawOutline,
  flowerOutline,
  helpCircleOutline,
  cartOutline,
  heart,
} from "ionicons/icons";
import "./Request.css";

const RequestOnMap: React.FC<any> = (props) => {
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
        <IonRow className="ion-align-items-center">
          <IonCol size="1">
            <div>
              <IonIcon
                color="tertiary"
                icon={personCircleOutline}
                size="large"
                slot="start"
              />
            </div>
          </IonCol>
          <IonCol>
            <IonCardTitle>
              {props.item.r_fn + " " + props.item.r_ln}{" "}
            </IonCardTitle>
          </IonCol>
        </IonRow>
      </IonCardHeader>

      <IonCardContent>
        <IonItem lines="none">
          <IonIcon slot="start" color="tertiary" icon={icon} />
          {props.item.des}
          <IonButtons slot="end">
            <IonButton>
              <IonIcon color="secondary" icon={heart} size="large" />
            </IonButton>
            Help
          </IonButtons>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default RequestOnMap;
