import React from 'react';
import {IonIcon, IonFab, IonFabButton } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';

const RequestBtn = () => {
    return(
        <IonFab vertical="top" horizontal="start" slot="fixed">
          <IonFabButton routerLink="/mapTab/makerequest">
            <IonIcon icon={addCircleOutline} />
          </IonFabButton>
          Add Request
        </IonFab>
    );
  };

  export default RequestBtn;