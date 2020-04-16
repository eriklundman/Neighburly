import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './HelpTab.css';

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
          <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default HelpTab;
