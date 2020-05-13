import React from 'react';
import {IonIcon, IonButton, IonItem, IonText } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';

const SettingsBtn = () => {
    return(
      <IonButton className="edit-profile-button" fill="outline"> 
        <IonItem routerLink="/edityourprofile" detail={false}>
         <IonText>Edit your profile </IonText>
        <IonIcon color="tertiary" icon={settingsOutline} slot="start" />
      </IonItem>
      </IonButton>
       
       
    );
  };

  export default SettingsBtn;