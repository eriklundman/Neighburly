import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './MenuTab.css';
import Menu from '../components/Menu'

const MenuTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-text-center">
        <IonToolbar color="primary">
          <IonTitle color="tertiary">Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Menu/>
      </IonContent>
    </IonPage>
  );
};

export default MenuTab;