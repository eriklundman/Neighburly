import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonCol, IonText, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './ProfileTab.css';
import { personCircleOutline } from 'ionicons/icons';



const ProfileTab: React.FC = () => {
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle color="tertiary">Neighburly</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 3 page" />
      </IonContent>
    </IonPage>
  );
};

export default ProfileTab;
