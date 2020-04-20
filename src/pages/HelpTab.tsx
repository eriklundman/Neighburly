import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './HelpTab.css';
import Help from '../components/Help'

const HelpTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle></IonTitle>
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
