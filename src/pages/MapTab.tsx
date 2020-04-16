import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SimpleMap from '../components/Map1';
import './MapTab.css';
import RequestBtn from '../components/AddRequest'

const MapTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Map tab</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className = "btn-and-map">
          <div className = "rqstbtn">
        <RequestBtn/>
        </div>
        </div>
        <SimpleMap/>
      </IonContent>
    </IonPage>
  );
};

export default MapTab;
