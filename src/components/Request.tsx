import React, { useEffect, useState } from "react";
import {
  IonIcon,
  IonButton,
  IonButtons,
  IonItem,
  IonModal,
  IonBadge,
  IonCardContent,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonPopover,
  IonList,
  IonAlert,
} from "@ionic/react";
import {
  chatbubblesOutline,
  checkmarkOutline,
  pawOutline,
  flowerOutline,
  helpCircleOutline,
  cartOutline,
  personCircleOutline,
  trashOutline,
} from "ionicons/icons";
import StarRatingComponent from "react-star-rating-component";
import {deleteActiveRequest, giveRating} from "../firebaseConfig";
import "./Request.css";

import * as firebase from "firebase";
import { useHistory } from "react-router-dom";
import { toast } from "../toast";

const db = firebase.firestore();


const Request: React.FC<any> = (props) => {
  const history = useHistory()
  const [notice, setNotice] = useState<any>();
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [rating, setRating] = useState(0);
  let userRef: any = firebase.auth().currentUser;
  let type = props.type;
  const [name, setName] = useState<any>();
  const [text, setText] = useState<any>();

  const [h_stars, setH_stars] = useState(0);
  const [r_stars, setR_stars] = useState(0);
  const [stars, setStars] = useState(0);

  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

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
    

    let unsubscribe = db.collection("users")
      .doc(props.item.r_id)
      .onSnapshot((snapshot: any) => {
        setR_stars(snapshot.data().rating + 0.5)
      });

    let unsubscribe2 = db.collection("users")
      .doc(props.item.h_id)
      .onSnapshot((snapshot: any) => {
        setH_stars(snapshot.data().rating + 0.5)
        
      });

    displayLayout();
      let unsubscribe3 : any;
      if (props.item.chatId) {
      unsubscribe3 = db.collection("chats")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "==",
          props.item.chatId
        )
        .onSnapshot(function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            let lastMessage = change.doc.data().newMessage;

            if (lastMessage === userRef.uid || lastMessage === "noNew") {
              setNotice(false);
            } else {
              setNotice(true);
            }
          });
        });
    }

    let unsubscribe4 = db.collection("requests")
      .doc(props.item.req_id)
      .onSnapshot((snapshot: any) => {
        if (snapshot.data()) {
          if (
              snapshot.data().h_completed === true &&
              snapshot.data().r_completed === true
          ) {
            db.collection("requests").doc(props.item.req_id).update({
              completed: true,
            });
          }
        }

      });
      return () => {unsubscribe(); unsubscribe2(); unsubscribe3(); unsubscribe4()}
  }, []);

  function displayLayout() {
    
    if (type === "youWillHelp") {
      setText("Helping");
      setName(props.item.r_fn + " " + props.item.r_ln);
      
    }

    if (type === "helpingYou") {
      setText("Being helped by");
      setName(props.item.h_fn + " " + props.item.h_ln);
      setStars(h_stars);
    }
    if (type === "iHelped") {
      setText("You have helped");
      setName(props.item.r_fn + " " + props.item.r_ln);
      setStars(r_stars);
    }
    if (type === "beenHelped") {
      setText("Been helped by");
      setName(props.item.h_fn + " " + props.item.h_ln);
      setStars(h_stars);
    }
  }

  function removeNotice() {
    setNotice(false);
  }

  const doneWithRequest = () => {
    if (rating===0) {
        return toast("You have to rate before you are done!")
    }
    else {

    setShowAlert(false);

    let helper: boolean
   
    if (userRef.uid === props.item.h_id) {
      helper = false;
      giveRating(rating, props.item.r_id, helper);
      db.collection("requests").doc(props.item.req_id).update({
        h_completed: true,
      });
    } else if (userRef.uid === props.item.r_id) {
      helper = true;
      giveRating(rating, props.item.h_id, helper);
      db.collection("requests").doc(props.item.req_id).update({
        r_completed: true,
      });
    }
    }
  };

 const goToReportUser = () => {
  setShowPopover({ open: false, event: undefined })
  history.push("/reportuser", {req: props.item})
 }

  return (
    <IonCard class={props.type + "class"}>
      <IonCardHeader>
        <IonCardSubtitle className={props.type}>{text}</IonCardSubtitle>

        {notice && (
          <IonBadge className="chatt-badge" color="danger">
            1
          </IonBadge>
        )}
        <IonButton
          fill="clear"
          className="ion-chat-button"
          onClick={removeNotice}
          routerLink={`/chat/${props.item.chatId}`}
        >
          <IonIcon
            color="tertiary"
            icon={chatbubblesOutline}
            slot="icon-only"
            size="large"
          />
        </IonButton>

        <IonCardTitle>
          <IonButton className="ion-no-padding"
            fill="clear"
            color="tertiary"
            onClick={(e) =>
              setShowPopover({ open: true, event: e.nativeEvent })
            }
          >
            <h3>{name}</h3>
          </IonButton>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="card-content">
        <IonItem lines="none">
          <IonIcon slot="start" color="tertiary" icon={icon} />
          <div className="rqst-des">
          {props.item.des}
          </div>

          {props.item.r_completed === false &&
          userRef &&
          userRef.uid === props.item.r_id ? (
            <IonButtons slot="end"> 
              <IonButton onClick={() => setShowAlert(true)} color="success" fill="outline">
                Done
                <IonIcon
                  color="success"
                  icon={checkmarkOutline}
                />
              </IonButton>
              </IonButtons>
        
          ) : props.item.h_completed === false &&
            userRef &&
            userRef.uid === props.item.h_id ? (

          <IonButtons slot="end"> 
              <IonButton onClick={() => setShowAlert(true)} color="success" fill="outline">
                Done
                <IonIcon
                  color="success"
                  icon={checkmarkOutline}
                />
              </IonButton>
              </IonButtons>
 
          ) : props.item.completed===true ? (
           
            <IonButtons slot="end"> 
               <IonButton onClick={() => setShowDeleteAlert(true)} fill="clear">
                <IonIcon
                  color="danger"
                  icon={trashOutline}
                  slot="icon-only"
                  size="large"
                />
              </IonButton>
              </IonButtons>

          ) : (
            <IonButtons slot="end"> 
            <IonBadge>WAITING...</IonBadge>
            </IonButtons>
          )}
        </IonItem>

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header={"Delete request"}
          message={"Are you sure you want to delete this request?"}
          buttons={[{text:'Cancel', cssClass:'alert-buttons'}, 
          {text:'Delete', 
          cssClass: 'alert-buttons',
          handler: () => {
            deleteActiveRequest(props.item.req_id, props.item.chatId);
          }}]}
        />

        <IonPopover
          css-class="ion-popover"
          animated={true}
          isOpen={showPopover.open}
          event={showPopover.event}
          onDidDismiss={(e) =>
            setShowPopover({ open: false, event: undefined })
          }
        >
          <IonList lines="none">
            <IonItem>
          <div className="profile-name-request">
            <IonIcon
              slot="end"
              size="large"
              color="tertiary"
              icon={personCircleOutline}
            />
            {name}
            </div>
            </IonItem>
            {userRef && userRef.uid === props.item.h_id ?
            <IonItem>
              <div style={{ fontSize: 25 }} className="profile-name-request">
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={r_stars}
                editing={false}
                starColor="#194afb"
                emptyStarColor="#bbd0ff"
              /></div></IonItem>:
              <IonItem>
              <div style={{ fontSize: 25 }} className="profile-name-request">
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={h_stars}
                editing={false}
                starColor="#194afb"
                emptyStarColor="#bbd0ff"
              /></div></IonItem>
            }
            <IonItem>
              <div className="profile-name-request">
            <IonButton color="danger" shape="round" onClick={goToReportUser}>Report user</IonButton>
            </div>
            </IonItem>
          </IonList>
        </IonPopover>
      </IonCardContent>


      <IonModal cssClass="css-class" isOpen={showAlert} onDidDismiss={() => setShowAlert(false)}>
            <div className="rating-box">
            <h3 className="title-design">Are you sure the request is done?</h3>
            <p className="info-text">If so, rate {name} with the stars!</p>
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
            <IonItem></IonItem>
        <IonButtons className="buttons-design">
          <IonButton
            className="cancel-button"
            fill="clear"
            expand="full"
            onClick={() => setShowAlert(false)}
          >
            Cancel
          </IonButton>
          <IonButton expand="full" fill="clear" className="done-button" onClick={() => doneWithRequest()}>Done rating!</IonButton>
        </IonButtons>

       
        </div>
      </IonModal>
    </IonCard>
  );
};
export default Request;