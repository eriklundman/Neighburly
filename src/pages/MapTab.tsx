import React, { useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonModal,
  IonButton,
  IonIcon,
  IonItem,
  IonButtons,

} from "@ionic/react";
import SimpleMap from "../components/Map1";
import "./MapTab.css";
import RequestBtn from "../components/AddRequest";
import { chevronUpOutline, chevronDownOutline } from "ionicons/icons";
import { getRequest } from "../firebaseConfig";

const MapTab: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const pageRef = useRef<any>();
  let array: any = []
  array = getRequest()
  
  const listItems = array.map((req: any) => {
    return(
      <p>{req.type}</p>
    )
  })


  return (
    <IonPage ref={pageRef}>
      <IonContent>

        <IonHeader collapse="condense">
        </IonHeader>
        <RequestBtn />
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

          <p>{listItems}</p>
        </IonModal>

        <SimpleMap />
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
