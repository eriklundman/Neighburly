import React from 'react';
import { IonIcon, IonGrid, IonItem, IonLabel, IonRange, IonRow } from '@ionic/react';
import { navigateCircleOutline } from 'ionicons/icons';



const EditRadius: React.FC<any> = props => {
  return (

    <IonItem>
      <IonGrid>
      <IonRow className="ion-align-items-center">
      <IonIcon size="large" color="tertiary" icon={navigateCircleOutline} />
      <IonLabel color="tertiary">  Radius: {props.radius} km</IonLabel>
      </IonRow>

      <IonRow>
      <IonRange color="tertiary" min={0} max={20} defaultValue={props.userRadius} pin={true} value={props.radius} onIonChange={e => props.setRadius(e.detail.value as number)} >
        <IonLabel color="tertiary" slot="start">0 km</IonLabel>
        <IonLabel color="tertiary" slot="end">20 km</IonLabel>
      </IonRange>
      </IonRow>

      </IonGrid>
    </IonItem>

  );
};

export default EditRadius;