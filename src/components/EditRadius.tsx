import React, { useState } from 'react';
import {IonIcon, IonButton, IonButtons, IonItem, IonLabel, IonRange } from '@ionic/react';
import { navigateCircleOutline } from 'ionicons/icons';


const EditRadius: React.FC<any> = props => {
    return(
        <IonItem> 
        <IonLabel color="tertiary"> Radius: {props.radius} </IonLabel>
        <IonIcon size="large" color="tertiary" icon={navigateCircleOutline} slot="start" />
      <IonRange color="tertiary" min={0} max={20} defaultValue={props.userRadius} pin={true} value={props.radius} onIonChange={e => props.setRadius(e.detail.value as number)} >
           <IonLabel color="tertiary" slot="start">0</IonLabel>
           <IonLabel color="tertiary" slot="end">20 km</IonLabel>
         </IonRange>
        </IonItem> 
       
    );
  };

  export default EditRadius;