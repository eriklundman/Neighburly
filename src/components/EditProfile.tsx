import React from 'react';
import {IonIcon, IonButton, IonText, IonContent, IonButtons, IonFabButton, IonFab } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';

const SettingsBtn = () => {
    return(
            <IonFab vertical="top" horizontal="start" slot="fixed">
                <IonFabButton routerLink="/profileTab/edityourprofile">
                 <IonIcon icon={settingsOutline} />
                </IonFabButton>    
          <IonText>
          Edit profile
          </IonText>
          </IonFab>
    );
  };

  export default SettingsBtn;