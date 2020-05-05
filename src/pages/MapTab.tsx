import React, { useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonModal,
  IonButton,
  IonIcon,
  IonButtons,
  IonList, 


} from "@ionic/react";
import SimpleMap from "../components/Map1";
import "./MapTab.css";
import RequestBtn from "../components/AddRequest";
import { chevronUpOutline, chevronDownOutline } from "ionicons/icons";
import {getRequest} from "../firebaseConfig";
import RequestOnMap from "../components/RequestOnMap";
import RefreshBtn from "../components/RefreshBtn"

const MapTab: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const pageRef = useRef<any>();

  const [userPos, setUserPos] = useState({lat:0, lng:0});
  const [userRad, setUserRadius] = useState(0)


  const userPosCallback = (userPosFromChild:any, userRadiusFromChild: any) => {
    setUserPos(userPosFromChild);
    setUserRadius (userRadiusFromChild);
  };

  const [info, setInfo] = useState([]);
  useEffect(() => {
    let data = getRequest();
    setInfo(data);
  },[]);

  const deg2Rad = (deg:number) => {
    const rad = deg * (Math.PI/180);
    return rad;
  }

  const checkIfInRadius = (lat:number, lng:number) => {

    //Haversines formel

    const dlat = lat - userPos.lat;
    const dlon = lng - userPos.lng;
    const R = 6373000;

    const a = (Math.sin(deg2Rad(dlat/2)))*(Math.sin(deg2Rad(dlat/2))) + Math.cos(deg2Rad(userPos.lat)) * Math.cos(deg2Rad(lat)) * (Math.sin(deg2Rad(dlon/2)))*(Math.sin(deg2Rad(dlon/2)))
    const c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) )

    const dist = R * c 

    if ( dist < userRad ) {
      return true
    }
    return false
  }


  return (
    <IonPage ref={pageRef}>
      <IonContent>

        <IonHeader collapse="condense">
        </IonHeader>
        <RequestBtn />
        <RefreshBtn/>
        
        <IonModal
          isOpen={showModal}
          swipeToClose={true}
          presentingElement={pageRef.current}
          onDidDismiss={() => setShowModal(false)}>
          <IonButtons className="modalButton">
            <IonButton color="white" onClick={() => setShowModal(false)}>
              <IonIcon className="modalButton" size="large" icon={chevronDownOutline} />
            </IonButton>
          </IonButtons>
          <IonContent scrollEvents={true}>
            <p>Request within radius</p>
          <IonList>
            {info.map((item: any, index: number) => (
                item.accepted===false && checkIfInRadius(item.lat, item.lng)===true?  <RequestOnMap key={index} item={item}/> : <p></p>
            ))}

          </IonList>
          </IonContent>
        </IonModal>
        <SimpleMap userPosition = {userPos} setUserPosition = {userPosCallback}/>
      </IonContent>
      <IonButtons className="modalButton">
        <IonButton color="white" onClick={() => setShowModal(true)}>
          <IonIcon className="modalButton" size="large" icon={chevronUpOutline} />
        </IonButton>
      </IonButtons>
    </IonPage>
  );
};

export default MapTab;
