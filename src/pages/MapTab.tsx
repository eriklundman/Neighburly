import React, { useState, useRef, useEffect} from "react";
import { Link } from 'react-router-dom';

import {
  IonContent,
  IonPage,
  IonModal,
  IonButton,
  IonIcon,
  IonButtons,
  IonList,
  IonItem, IonFooter, useIonViewDidLeave,

} from "@ionic/react";
import SimpleMap from "../components/Map1";
import "./MapTab.css";
import RequestBtn from "../components/AddRequest";
import { chevronUpOutline, chevronDownOutline, informationCircleOutline } from "ionicons/icons";
import RequestOnMap from "../components/RequestOnMap";
import * as firebase from 'firebase'
import { useHistory } from "react-router";
const db = firebase.firestore();


const MapTab: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const pageRef = useRef<any>();

  const [userPos, setUserPos] = useState({ lat: 0, lng: 0 });
  const [userRad, setUserRadius] = useState(0)
  const history = useHistory()

  const closeModalCallback = () => {
    setShowModal(false)
  }

  const userPosCallback = (userPosFromChild: any, userRadiusFromChild: any) => {
    setUserPos(userPosFromChild);
    setUserRadius(userRadiusFromChild);
  };

  const [info, setInfo] = useState([]);
  const [userId, setUserId] = useState<any>();

  useEffect(() => {

    let userRef: any = firebase.auth().currentUser
    let blockRef: any = db.collection("blocked_users")

    if (blockRef) {
      blockRef.onSnapshot((snapshot: any) => {
        snapshot.forEach((blocked_user: any)=>{
          if (userRef && userRef.uid === blocked_user.id) { 
            history.push("/blockedpage")
          }
        })
        
      })
    }

    if (userRef && userRef.email === "admin@neighburly.se") {
      history.push("/adminpage")
    }

    else {
      setUserId(userRef.uid)
      let reqArr: any = [];
      let requestRef = db.collection("requests");
      requestRef.onSnapshot(snapshot => {
        reqArr = [];
        snapshot.forEach(req => {
          reqArr.push({ accepted: req.data().accepted, req_id: req.id, lat: req.data().coordinates[0], lng: req.data().coordinates[1], type: req.data().type, des: req.data().description, r_fn: req.data().receiver_fn, r_ln: req.data().receiver_ln, r_id: req.data().receiver_id, h_id: req.data().helper_id })
        });

        loadData(reqArr);
      })
    }
  }, []);

  function loadData(data: any) {
    setInfo(data);
  }

  const deg2Rad = (deg: number) => {
    const rad = deg * (Math.PI / 180);
    return rad;
  }

  const checkIfInRadius = (lat: number, lng: number) => {

    //Haversines formel

    const dlat = lat - userPos.lat;
    const dlon = lng - userPos.lng;
    const R = 6373000;

    const a = (Math.sin(deg2Rad(dlat / 2))) * (Math.sin(deg2Rad(dlat / 2))) + Math.cos(deg2Rad(userPos.lat)) * Math.cos(deg2Rad(lat)) * (Math.sin(deg2Rad(dlon / 2))) * (Math.sin(deg2Rad(dlon / 2)))
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const dist = R * c

    if (dist < userRad) {
      return true
    }
    return false
  }

  useIonViewDidLeave(() => {
    setShowModal(false);
})


  return (
    <IonPage ref={pageRef}>
      <IonContent scrollY={false}>


        <RequestBtn />


        <IonModal
          cssClass="cssclass"
          isOpen={showModal}
          swipeToClose={true}
          presentingElement={pageRef.current}
          onDidDismiss={() => setShowModal(false)}>
          <IonButtons className="modalButton">
            <IonButton color="white" onClick={() => setShowModal(false)}>
              <IonIcon className="modalButton" size="large" icon={chevronDownOutline} />
            </IonButton>
          </IonButtons>
          <IonContent scrollEvents={true} color="light">
            <IonItem lines="none" color="light">
              <h2 className="background-color">My requests</h2>
            </IonItem>
            <IonList className="background-color">
              {info.map((item: any, index: number) => (
                item.accepted === false && checkIfInRadius(item.lat, item.lng) === true && item.r_id === userId && item.h_id === undefined ? <RequestOnMap key={index} item={item} closeModal={closeModalCallback} userId={userId} />
                  : console.log()
              ))}
            </IonList>
            <IonItem lines="none" color="light">
              <h2 className="background-color">Other requests</h2>
            </IonItem>
            <IonList className="background-color">
              {info.map((item: any, index: number) => (
                item.accepted === false && checkIfInRadius(item.lat, item.lng) === true && item.r_id !== userId && item.h_id === undefined ? <RequestOnMap key={index} item={item} closeModal={closeModalCallback} userId={userId} />
                  : console.log()
              ))}
            </IonList>
          </IonContent>
          <IonFooter>
            <div
            className="changeInfo">
              <IonIcon icon={informationCircleOutline}></IonIcon>
              <div>
              <p className="radius-info">Go to <Link onClick={() => setShowModal(false)} className="link-style" to="/profileTab"> <b>Profile</b></Link> to edit your radius</p>
              </div>
            </div>
            </IonFooter>
        </IonModal>

        <SimpleMap userPosition={userPos} setUserPosition={userPosCallback} />

        <div className="ion-modal-opener">
          <IonButton className="modalButton2" expand="full" fill="clear" onClick={() => setShowModal(true)}>
            <IonIcon slot="icon-only" size="large" color="tertiary" icon={chevronUpOutline} />
          </IonButton>
          <p className="modal-text">See all requests within your radius</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MapTab;
