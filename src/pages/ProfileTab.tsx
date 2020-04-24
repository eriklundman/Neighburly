import React from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar} from '@ionic/react';
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
          </IonHeader>
        <Profile/>
      </IonContent>
    </IonPage>
  );
};

export default ProfileTab;
