import React, { useState, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonButton,
} from "@ionic/react";
import SimpleMap from "../components/Map1";
import "./MapTab.css";
import RequestBtn from "../components/AddRequest";

const MapTab: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const pageRef = useRef();

  return (
    <IonPage ref={pageRef}>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Map tab</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RequestBtn />
        <SimpleMap />
      </IonContent>
    </IonPage>
  );
};

export default MapTab;
