
import { IonContent, IonGrid, IonIcon, IonLabel, IonRow, IonSegment, IonSegmentButton, IonText, IonToolbar } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import SettingsBtn from '../components/EditProfile';

const Profile: React.FC = () => {
  
 
    return (
          <IonContent>
            <IonGrid>
            <IonRow>
            <IonIcon size="large" color="tertiary" icon={personCircleOutline}/>
            <IonText>Name of user</IonText>
            </IonRow>

          <SettingsBtn/>
         <IonRow>
           <IonToolbar>
         <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
          <IonSegmentButton value="helper">
            <IonLabel>Helper</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="receiver">
            <IonLabel>Receiver</IonLabel>
          </IonSegmentButton>
         </IonSegment>
         </IonToolbar>
         </IonRow>
         </IonGrid>
         </IonContent>
  );
  }

  export default Profile;
