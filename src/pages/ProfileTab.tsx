import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonTitle, IonImg, IonThumbnail, IonCol, IonItem, IonIcon } from '@ionic/react';
import './ProfileTab.css';
import Profile from '../components/Profile';
import HeaderLogga from '../components/HeaderLogga';

const ProfileTab: React.FC = () => {

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
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
          </IonHeader>
        <Profile/>
      </IonContent>
    </IonPage>
  );
};

export default ProfileTab;
