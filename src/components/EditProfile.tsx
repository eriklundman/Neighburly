import React from 'react';
import {IonIcon, IonButton, IonText } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';

const SettingsBtn = () => {
    return(
      <IonButton routerLink="/edityourprofile" fill="outline"> 

         <IonText color="tertiary">Edit your profile </IonText>
        <IonIcon color="tertiary" icon={settingsOutline} slot="start" />

      </IonButton>
       
       
    );
  };

  export default SettingsBtn;