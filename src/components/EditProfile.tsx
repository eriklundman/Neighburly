import React from 'react';
import {IonIcon, IonButton, IonButtons, IonItem, IonLabel } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';

const SettingsBtn = () => {
    return(
        <IonButtons>
        <IonButton> 
        <IonItem routerLink="/profileTab/edityourprofile/">
        <IonLabel> Edit your profile </IonLabel>
        <IonIcon color="tertiary" icon={settingsOutline} slot="start" />
      </IonItem>
        </IonButton>
        </IonButtons>
       
       
    );
  };

  export default SettingsBtn;