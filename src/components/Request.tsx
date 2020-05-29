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
  IonAlert,
  IonActionSheet,
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
  ellipsisHorizontal,
  closeOutline,
} from "ionicons/icons";
import StarRatingComponent from "react-star-rating-component";
import { deleteActiveRequest, giveRating } from "../firebaseConfig";
import "./Request.css";

import * as firebase from "firebase";
import { useHistory } from "react-router-dom";
import { toast } from "../toast";

const db = firebase.firestore();

const Request: React.FC<any> = (props) => {
  const history = useHistory();
  const [notice, setNotice] = useState<any>();
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showForceRateAlert, setShowForceRateAlert] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [rating, setRating] = useState(0);
  let userRef: any = firebase.auth().currentUser;
  let type = props.type;
  const [name, setName] = useState<any>();
  const [text, setText] = useState<any>();
  const [pending, setPending] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [completeMessage, setCompleteMessage] = useState("");
  const [h_stars, setH_stars] = useState(0);
  const [r_stars, setR_stars] = useState(0);
  const [stars, setStars] = useState(0);
  const [otherAccept, setOtherAccept] = useState(false);
  const [showHastoRateAlert, setshowHastoRateAlert] = useState(false);


  const [showPopover, setShowPopover] = useState<{
    open: boolean;
    event: Event | undefined;
  }>({
    open: false,
    event: undefined,
  });

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showActionSheetRated, setShowActionSheetRated] = useState(false);


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
    let unsubscribe = db
      .collection("users")
      .doc(props.item.r_id)
      .onSnapshot((snapshot: any) => {
        setR_stars(snapshot.data().rating + 0.5);
      });

    let unsubscribe2 = db
      .collection("users")
      .doc(props.item.h_id)
      .onSnapshot((snapshot: any) => {
        setH_stars(snapshot.data().rating + 0.5);
      });

    displayLayout();
    let unsubscribe3: any;
    if (props.item.chatId) {
      unsubscribe3 = db
        .collection("chats")
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

    let unsubscribe4 = db
      .collection("requests")
      .doc(props.item.req_id)
      .onSnapshot((snapshot: any) => {
        if (snapshot.data()) {
          let data = snapshot.data();
          if (data.h_completed === true && data.r_completed === true) {
            db.collection("requests").doc(props.item.req_id).update({
              completed: true,
            });
          }

          if (data.helper_id === userRef.uid && data.completed === false && data.r_completed === true) {
            setPending( props.item.r_fn + " has marked this as done");
            //här måste man ratea innan delete
            setOtherAccept(true);
          }

          else if (
            data.receiver_id === userRef.uid &&
            data.completed === false &&
            data.h_completed === true
          ) {
            setPending(props.item.h_fn + " has marked this as done");
            //här måste man ratera innan delete
            setOtherAccept(true);
          }
          else (setPending(""))

          if (data.helper_id === userRef.uid && data.completed === false && data.h_completed === true) {
            setCompleteMessage("Waiting for " + props.item.r_fn + " to mark as done");
            setHasRated(true);
            //här ska man inte kunna ratea igen
          }
          else if (data.receiver_id === userRef.uid && data.completed === false && data.r_completed === true) {
            setCompleteMessage("Waiting for " + props.item.h_fn + " to mark as done");
            setHasRated(true);
            //här ska man inte kunna ratea igen
          } else {setCompleteMessage("")}

          if (data.r_deleted || data.h_deleted) {
            setDeleteMessage("Other user has deleted request")
            setCompleteMessage("");
          }
          else {setDeleteMessage("")}
        }
      });
    return () => {
      unsubscribe();
      unsubscribe2();
      unsubscribe3();
      unsubscribe4();
    };
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
    if (rating === 0) {
      setshowHastoRateAlert(true);
        } else {
      setShowAlert(false);

      let helper: boolean;

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

  function removeRequest() {
    if (userRef.uid === props.item.h_id) {

      db.collection("requests").doc(props.item.req_id).update({
        h_deleted: true,
      });
      db.collection("chats").doc(props.item.chatId).update( {
        participants: firebase.firestore.FieldValue.arrayRemove(userRef.uid)
      })
    } else if (userRef.uid === props.item.r_id) {
      db.collection("requests").doc(props.item.req_id).update({
        r_deleted: true,
      });
      db.collection("chats").doc(props.item.chatId).update( {
        participants: firebase.firestore.FieldValue.arrayRemove(userRef.uid)
      })
    }
  }

  const goToReportUser = () => {
    setShowPopover({ open: false, event: undefined });
    history.push("/reportuser", { req: props.item });
  };

  return (
    <IonCard class={props.type + "class"}>
      <IonCardHeader>
        <IonCardSubtitle className={props.type}>{text}</IonCardSubtitle>
        <IonBadge className="request-state-badge" color="success">{pending}</IonBadge>
        <IonBadge className="request-state-badge" color="danger">{deleteMessage}</IonBadge>
        <IonBadge className="request-state-badge">{completeMessage}</IonBadge>

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
          <IonButton
            className="ion-no-padding"
            fill="clear"
            color="tertiary"
            onClick={(e) =>
              setShowPopover({ open: true, event: e.nativeEvent })
            }
          >
            <h3 className="request-name">{name}</h3>
          </IonButton>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="card-content">
        <IonItem lines="none">
          <IonIcon slot="start" color="tertiary" icon={icon} />
          <div className="rqst-des">{props.item.des}</div>

          {props.item.r_completed === false &&
          userRef &&
          userRef.uid === props.item.r_id ? (
            <IonButtons slot="end">
              <IonButton onClick={(e) => hasRated ? setShowActionSheetRated(true): setShowActionSheet(true)} fill="clear">
                <IonIcon color="tertiary" icon={ellipsisHorizontal} />
              </IonButton>
            </IonButtons>
          ) : props.item.h_completed === false &&
            userRef &&
            userRef.uid === props.item.h_id ? (
            <IonButtons slot="end">
              <IonButton onClick={() => hasRated ? setShowActionSheetRated(true): setShowActionSheet(true)} fill="clear">
                <IonIcon color="tertiary" icon={ellipsisHorizontal} />
              </IonButton>
            </IonButtons>
          ) : props.item.completed === true ? (
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
                <IonButton
                    onClick={(e) =>
                      hasRated ? setShowActionSheetRated(true): setShowActionSheet(true)
                    }
                    fill="clear"
                >
                  <IonIcon color="tertiary" icon={ellipsisHorizontal} />
                </IonButton>
              </IonButtons>
          )}
        </IonItem>

        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: "Mark as done",
              icon: checkmarkOutline,
              cssClass: "action-sheet-done",
              handler: () => {
                setShowAlert(true);
              }
            },{
              text: 'Delete request',
              role:'destructive',
              icon: trashOutline,
              handler: () => {
                otherAccept ? setShowForceRateAlert(true) : setShowDeleteAlert(true)
              }
            },{
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'action-sheet-cancel',
            }
            
          ]}
        ></IonActionSheet>

        <IonActionSheet
          isOpen={showActionSheetRated}
          onDidDismiss={() => setShowActionSheetRated(false)}
          buttons={[
           {
              text: 'Delete request',
              role:'destructive',
              icon: trashOutline,
              handler: () => {
                otherAccept ? setShowForceRateAlert(true) : setShowDeleteAlert(true)
              }
            },{
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'action-sheet-cancel',
            }
            
          ]}
        ></IonActionSheet>

        <IonActionSheet
          isOpen={showActionSheetRated}
          onDidDismiss={() => setShowActionSheetRated(false)}
          buttons={[
           {
              text: 'Delete request',
              role:'destructive',
              icon: trashOutline,
              handler: () => {
                otherAccept ? setShowForceRateAlert(true) : setShowDeleteAlert(true)
              }
            },{
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'action-sheet-cancel',
            }
            
          ]}
        ></IonActionSheet>

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
                removeRequest()
              },
            },
          ]}
        />

        <IonAlert
            isOpen={showForceRateAlert}
            onDidDismiss={() => setShowForceRateAlert(false)}
            header={"Cannot delete"}
            message={"You have to rate the other person before you can delete"}
            buttons={[
              { text: "Cancel", cssClass: "alert-buttons" },
              {
                text: "Rate now",
                cssClass: "alert-buttons",
                handler: () => {
                  setShowAlert(true)
                },
              },
            ]}
        />

<IonAlert
            isOpen={showHastoRateAlert}
            onDidDismiss={() => setshowHastoRateAlert(false)}
            header={"Give rating"}
            message={"You have to rate before you can mark the request as done"}
            buttons={[
              { text: "Ok", cssClass: "alert-buttons",
              handler: () => {
                setShowAlert(true)
              },
             }, 
            ]}
        />


        <IonPopover
          cssClass="ion-popover"
          animated={true}
          isOpen={showPopover.open}
          event={showPopover.event}
          onDidDismiss={() => setShowPopover({ open: false, event: undefined })}
        >
          <div className="ion-popover">
            <IonButton
              color="tertiary"
              onClick={()=>setShowPopover({open:false, event:undefined})}
              className="popover-close-btn"
              fill="clear"
            >
              <IonIcon icon={closeOutline}></IonIcon>
            </IonButton>

            <div className="profile-name-request">
              <IonIcon
                slot="end"
                size="large"
                color="tertiary"
                icon={personCircleOutline}
              />
              {name}
            </div>

            {userRef && userRef.uid === props.item.h_id ? (
              <div style={{ fontSize: 27 }} className="profile-name-request">
                <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={r_stars}
                  editing={false}
                  starColor="#194afb"
                  emptyStarColor="#bbd0ff"
                />
              </div>
            ) : (
              <div style={{ fontSize: 27 }} className="profile-name-request">
                <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={h_stars}
                  editing={false}
                  starColor="#194afb"
                  emptyStarColor="#bbd0ff"
                />
              </div>
            )}

            <div className="report-user-btn">
              <IonButton expand="block" color="danger" onClick={goToReportUser}>
                Report user
              </IonButton>
            </div>
          </div>
        </IonPopover>
      </IonCardContent>

      <IonModal
        cssClass="css-class"
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
      >
        <div className="rating-box">
          <h3 className="title-design">Are you sure the request is done?</h3>
          <p className="info-text">If so, rate {name} with the stars!</p>
          <div className="rating-design" style={{ fontSize: 45 }}>
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
            <IonButton
              expand="full"
              fill="clear"
              className="done-button"
              onClick={() => doneWithRequest()}
            >
              Done rating!
            </IonButton>
          </IonButtons>
        </div>
      </IonModal>
    </IonCard>
  );
};
export default Request;
