import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonCol, IonText, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import './ProfileTab.css';
import Profile from '../components/Profile'
import SettingsBtn from '../components/EditProfile';

const ProfileTab: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle color="tertiary">Neighburly</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
          </IonHeader>
        <Profile/>
        <SettingsBtn/>
      </IonContent>
    </IonPage>
  );
};

export default ProfileTab;
