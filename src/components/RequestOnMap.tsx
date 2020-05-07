import React from "react";
import {
  IonIcon,
  IonButton,
  IonButtons,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardContent,
} from "@ionic/react";
import {
  personCircleOutline,
  pawOutline,
  flowerOutline,
  helpCircleOutline,
  cartOutline,
  heart,
  trashBinOutline,
  trashOutline,
} from "ionicons/icons";
import "./Request.css";
import { helpRequest, deleteRequest } from "../firebaseConfig";

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
      { props.userId !== props.item.r_id ?
        <div className="profile-name-request">
          <IonIcon
            slot="end"
            size="large"
            color="tertiary"
            icon={personCircleOutline}
          />
          <h3 color="tertiary">{props.item.r_fn + " " + props.item.r_ln[0]}</h3>
        </div>
         :
         <h3 color="tertiary">Your Own Request</h3>
       }
      </IonCardHeader>

      <IonCardContent>
        <IonItem lines="none">
          <IonIcon slot="start" color="tertiary" icon={icon} />
          {props.item.des}

          {props.userId !== props.item.r_id ?

          <IonButtons slot="end">
            <IonButton color="secondary" shape="round" onClick={() => helpRequest(props.item.req_id)}>
              <IonIcon
                slot="start"
                color="secondary"
                icon={heart}
                size="large"
              />
              Help
            </IonButton>
          </IonButtons>
            :
            <IonButtons slot="end">
            <IonButton color="danger" shape="round" onClick={() => deleteRequest(props.item.req_id)}>
              <IonIcon
                slot="start"
                color="danger"
                icon={trashOutline}
                size="large"
              />
              Delete
            </IonButton>
          </IonButtons>
            
            
            }
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default RequestOnMap;
