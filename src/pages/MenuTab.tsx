import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './MenuTab.css';

const MenuTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">MenuTab</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 0 page" />
      </IonContent>
    </IonPage>
  );
};

export default MenuTab;