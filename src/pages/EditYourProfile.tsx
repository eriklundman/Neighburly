import React from 'react';
import { IonPage, IonToolbar, IonTitle, IonText, IonButtons, IonBackButton, IonContent, IonLabel, IonItem, IonIcon, IonButton, IonItemGroup, } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import EditRadius from '../components/EditRadius'
import EditInfo from '../components/EditInfo'


const EditYourProfile: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar color="primary">
          <IonTitle color="tertiary">Neighburly</IonTitle>
        </IonToolbar>
        <IonContent>
        <IonItem> 
        <IonButtons slot="start">
          <IonBackButton color="tertiary" defaultHref="/profileTab" />
        </IonButtons>
        <IonTitle color="tertiary"> Edit profile </IonTitle>
        <IonIcon color="tertiary" icon={settingsOutline} slot="start"/>
      </IonItem>
      <EditRadius/>
      <EditInfo/>
      <IonButtons>
          <IonButton className="ion-text-capitalize" color="secondary">Change password</IonButton>
          </IonButtons>
          <IonButton color="danger">Delete account</IonButton>
         </IonContent>
        </IonPage>
    );
};

export default EditYourProfile