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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Help tab</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton color="primary" id="knapp">knapp</IonButton>
          <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default HelpTab;
