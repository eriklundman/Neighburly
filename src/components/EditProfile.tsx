import React from 'react';
import {IonIcon, IonButton, IonButtons, IonItem, IonText } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';

const SettingsBtn = () => {
    return(
        <IonButton fill="outline"> 
        <IonItem routerLink="/edityourprofile">
         <IonText>Edit your profile </IonText>
        <IonIcon color="tertiary" icon={settingsOutline} slot="start" />
      </IonItem>
        </IonButton>
       
       
    );
  };

  export default SettingsBtn;