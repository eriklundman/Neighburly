import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './HelpTab.css';

const HelpTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hej hej här ändrar jag //Jocke</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton color="primary" id="knapp">knapp</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HelpTab;
