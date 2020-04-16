import React from 'react';
import { IonFabButton, IonIcon, IonFab } from '@ionic/react';
import {addOutline } from 'ionicons/icons';

const RequestBtn = () => {
    return(
    <IonFab vertical="top" horizontal="start" slot="fixed">
        <IonFabButton>
          <IonIcon icon={addOutline} size="large"/>
        </IonFabButton>
        Add Rqst
      </IonFab>
    );
  };

  export default RequestBtn;