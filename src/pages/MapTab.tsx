import React, { useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonModal,
  IonButton,
  IonIcon,
  IonItem,
<<<<<<< Updated upstream
  IonButtons, IonList,
=======
  IonButtons,
  IonList
>>>>>>> Stashed changes

} from "@ionic/react";
import SimpleMap from "../components/Map1";
import "./MapTab.css";
import RequestBtn from "../components/AddRequest";
import Request from "../components/Request";
import { chevronUpOutline, chevronDownOutline } from "ionicons/icons";
import {getRequest} from "../firebaseConfig";
import RequestOnMap from "../components/RequestOnMap";

const MapTab: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const pageRef = useRef<any>();


  const [info, setInfo] = useState([]);
  useEffect(() => {
    let data = getRequest();
    setInfo(data)
    console.log("hej")
  },[]);



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
          <IonContent scrollEvents={true}>
          <IonList>
            {info.map((item: any, index: number) => (
                <RequestOnMap key={index} item={item}/>
            ))}

          </IonList>
          </IonContent>

<<<<<<< Updated upstream
        </IonModal>

        <SimpleMap />
=======
          <IonList>
        <Request/>
        </IonList>

        </IonModal>
        <SimpleMap/>
>>>>>>> Stashed changes
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
