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
import { deleteRequest, waitForAcceptRequest } from "../firebaseConfig";
import StarRatingComponent from "react-star-rating-component";
import * as firebase from "firebase";
import { useHistory } from "react-router-dom";

const db = firebase.firestore();

const RequestOnMap: React.FC<any> = (props) => {
  const history = useHistory();
  const [stars, setStars] = useState(3);
  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

  const [showHelpAlert, setShowHelpAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    db.collection("users")
      .doc(props.item.r_id)
      .onSnapshot((snapshot: any) => {
        if (snapshot.data()) {
          setStars(snapshot.data().rating + 0.5);
        }
      });
  }, []);

  const goToReportUser = () => {
    setShowPopover({ open: false, event: undefined });
    props.closeModal();
    history.push("/reportuser", { req: props.item });
  };

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
        onDidDismiss={(e) => setShowPopover({ open: false, event: undefined })}
      >
        <div className="ion-popover">
          <div className="profile-name-request">
            <IonIcon
              slot="end"
              size="large"
              color="tertiary"
              icon={personCircleOutline}
            />
            <h3>{props.item.r_fn + " " + props.item.r_ln}</h3>
          </div>

          <div style={{ fontSize: 27 }} className="profile-name-request">
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={stars}
              editing={false}
              starColor="#194afb"
              emptyStarColor="#bbd0ff"
            />
          </div>
      
          <div className="report-user-btn">
            <IonButton color="danger" expand="block" onClick={goToReportUser}>
              Report user
            </IonButton>
          </div>
        </div>
      </IonPopover>

      <IonCardContent className="card-content">
        <IonItem lines="none" onClick={() => setShowHelpAlert(true)}>
          <IonIcon slot="start" color="tertiary" icon={icon} />
          <div className="rqst-des">{props.item.des}</div>

          {props.userId !== props.item.r_id ? (
            <IonButtons slot="end">
              <IonButton
                color="secondary"
                shape="round"
                onClick={() => setShowHelpAlert(true)}
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
                onClick={() => setShowDeleteAlert(true)}
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
          isOpen={showHelpAlert}
          onDidDismiss={() => setShowHelpAlert(false)}
          header={"Help " + props.item.r_fn + "!"}
          message={"Do you want to help " + props.item.r_fn + "?"}
          buttons={[
            { text: "Cancel", cssClass: "alert-buttons" },
            {
              text: "Help",
              cssClass: "alert-buttons",
              handler: () => {
                waitForAcceptRequest(props.item.req_id);
              },
            },
          ]}
        />
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header={"Delete request"}
          message={"Are you sure you want to delete this request?"}
          buttons={[
            { text: "Cancel", cssClass: "alert-buttons" },
            {
              text: "Delete",
              cssClass: "alert-buttons",
              handler: () => {
                deleteRequest(props.item.req_id);
              },
            },
          ]}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default RequestOnMap;
