import React from 'react';
import {IonIcon, IonButton, IonButtons, IonItem, IonLabel, IonRange } from '@ionic/react';
import { navigateCircleOutline } from 'ionicons/icons';


const EditRadius = () => {
    return(
        <IonButtons>
            <IonButton>
        <IonItem routerLink="/profileTab/edityourprofile/">
        <IonLabel color="tertiary"> Set radius </IonLabel>
        <IonIcon size="large" color="tertiary" icon={navigateCircleOutline} slot="start" />
      </IonItem>
      </IonButton>
         <IonRange color="tertiary" min={0} max={20} >
           <IonLabel color="tertiary" slot="start">0</IonLabel>
           <IonLabel color="tertiary" slot="end">20 km</IonLabel>
         </IonRange>
        </IonButtons>  
       
    );
  };

  export default EditRadius;