import React, { useState, useEffect } from "react";
import {
  IonSegmentButton,
  IonLabel,
  IonContent,
  IonSegment,
  IonRow,
  IonGrid,
  IonList,
} from "@ionic/react";
import Request from "../components/Request";
import * as firebase from "firebase";
import "./Help.css";

const db = firebase.firestore();

/* kolla detta https://www.youtube.com/watch?v=44Avd9NBf7M elements, inte string */
const Help: React.FC = () => {
  const [info, setInfo] = useState([]);
  const [defValue, setDefValue] = useState("");
  const [id, setId] = useState<any>();

  const [activeHelps, setActiveHelps] = useState<number>();
  const [inactiveHelps, setInctiveHelps] = useState<number>();


  useEffect(() => {
    setDefValue("activehelps");
    let userRef: any = firebase.auth().currentUser;
    setId(userRef.uid);
    let reqArr: any = [];
    let unsubscribe = db.collection("requests").orderBy("timeStamp", "desc")
        .onSnapshot((snapshot) => {
      reqArr = [];
      snapshot.forEach((req) => {
        reqArr.push({
          accepted: req.data().accepted,
          completed: req.data().completed,
          h_completed: req.data().h_completed,
          r_completed: req.data().r_completed,
          req_id: req.id,
          r_id: req.data().receiver_id,
          h_id: req.data().helper_id,
          type: req.data().type,
          des: req.data().description,
          r_fn: req.data().receiver_fn,
          r_ln: req.data().receiver_ln,
          h_fn: req.data().helper_fn,
          h_ln: req.data().helper_ln,
          chatId: req.data().chatId,
        });
      });
      loadData(reqArr);
    });
    return () => {unsubscribe()}
  }, []);

  useEffect(() => {
    const myElement: HTMLElement | null = document.getElementById("hej");
    if (myElement !== null) {
    const actives1 = myElement.getElementsByClassName("youWillHelpclass")
    const actives2 = myElement.getElementsByClassName("helpingYouclass")
    const inactives1 = myElement.getElementsByClassName("iHelpedclass")
    const inactives2 = myElement.getElementsByClassName("beenHelpedclass")
      setActiveHelps(actives1.length + actives2.length);
      setInctiveHelps(inactives1.length + inactives2.length);
    }
  }, [info, defValue]);

  function loadData(data: any) {
    setInfo(data);
  }

  function active() {
    setDefValue("activehelps");
  }

  function inactive() {
    setDefValue("inactivehelps");
  }

  return (
    <IonContent>
      <IonGrid>
          <IonRow>
            <IonSegment
              onIonChange={(e) =>
                console.log("Segment selected", e.detail.value)
              }
              value={defValue}
            >
              <IonSegmentButton onClick={active} value="activehelps">
                <IonLabel color="secondary">Ongoing helps</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton onClick={inactive} value="inactivehelps">
                <IonLabel color="secondary">Completed helps</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonRow>


        <IonList id="hej">
          {defValue === "activehelps"
            ? info.map((item: any, index: number) =>
                item.accepted === true && item.completed === false ? (
                  item.h_id === id ? (
                    <Request key={index} item={item} type={"youWillHelp"} />
                  ) : item.r_id === id ? (
                    <Request key={index} item={item} type={"helpingYou"} />
                  ) : (
                  console.log()
                  )
                ) : (
                  console.log()
                )
              )
            : info.map((item: any, index: number) =>
                item.completed === true && item.h_id === id ? (
                  <Request key={index} item={item} type={"iHelped"} />
                ) : item.completed === true && item.r_id === id ? (
                  <Request key={index} item={item} type={"beenHelped"} />
                ) : (
                  console.log()
                )
              )}
        </IonList>
        {activeHelps === 0 && defValue === "activehelps"?
        <div className="ion-text-center">
        <h3>You have no ongoing helps! </h3>
        <p>Go to the request page to help someone in need or post your own request.</p>
        </div>
        :
        console.log()
            }
        
        {inactiveHelps === 0 && defValue === "inactivehelps"?
        <div className="ion-text-center">
        <h3>You have no completed helps! </h3>
        <p>This is where the requests will end up after both parties have confirmed it is completed.</p>
        </div>
        :
        console.log()
            }
      </IonGrid>
    </IonContent>
  );
};

export default Help;
