import React from 'react';
import { IonContent, IonTitle, IonIcon, IonGrid, IonRow, IonCol, IonText, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { personCircleOutline, settingsOutline } from 'ionicons/icons';


const Profile: React.FC = () => {
    return (
        <IonContent>
            <IonGrid>
          <IonRow>
            <IonIcon size="large" color="tertiary" icon={personCircleOutline}/>
          </IonRow>
          <IonRow>
         </IonRow>
         <IonRow>
         <IonIcon size="large" color="tertiary" icon={settingsOutline}></IonIcon>
         </IonRow>
         <IonRow>
         <IonText color="tertiary">Edit profile</IonText>
         </IonRow>
         <IonRow>
         <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
          <IonSegmentButton value="helper">
            <IonLabel>Helper</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="receiver">
            <IonLabel>Receiver</IonLabel>
          </IonSegmentButton>
         </IonSegment>
         </IonRow>
         </IonGrid>
        </IonContent>
  );
  }
  
  export default Profile;