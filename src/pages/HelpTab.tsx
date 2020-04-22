import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './HelpTab.css';
import Help from '../components/Help';
import HeaderLogga from '../components/HeaderLogga';


const HelpTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
      <HeaderLogga/>
      </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Help tab</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Help/>     
 </IonContent>
    </IonPage>
  );
};

export default HelpTab;