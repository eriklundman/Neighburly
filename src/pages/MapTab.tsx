import React, { useState, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonModal,
  IonButton,
  IonIcon,
} from "@ionic/react";
import SimpleMap from "../components/Map1";
import "./MapTab.css";
import RequestBtn from "../components/AddRequest";
import { chevronUpOutline, chevronDownOutline } from "ionicons/icons";

const MapTab: React.FC = () => {
  const [showModal, setShowModal] = useState(true);
  const pageRef = useRef<any>();

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
          onDidDismiss={() => setShowModal(false)}
        >
          <IonButton color="white" onClick={() => setShowModal(false)}>
          <IonIcon size="large" icon={chevronDownOutline}/>
          </IonButton>
          <p>This is modal content</p>
        </IonModal>
        <SimpleMap/>
      </IonContent>
      <IonButton color="white" onClick={() => setShowModal(true)}>
        <IonIcon size="large" icon={chevronUpOutline}/>
      
      </IonButton>

    </IonPage>
  );
};

export default MapTab;
