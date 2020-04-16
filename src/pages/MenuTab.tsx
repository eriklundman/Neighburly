import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './MenuTab.css';
import Menu from '../components/Menu'

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
        <Menu/>
      </IonContent>
    </IonPage>
  );
};

export default MenuTab;