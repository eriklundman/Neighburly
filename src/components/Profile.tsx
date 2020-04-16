import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonCol, IonText, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';


const Profile: React.FC = () => {
    return (
        <IonContent>
            <IonGrid>
          <IonRow>
            <IonCol>
            <IonIcon size="large" color="tertiary" icon={personCircleOutline} />
            <IonText>Edit profile</IonText>
            </IonCol>
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