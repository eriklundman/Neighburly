import React from 'react';
import {IonIcon, IonFab, IonFabButton } from '@ionic/react';
import { refresh } from 'ionicons/icons';

const RefreshBtn = () => {

    const rfrsh = ()=> {
        window.location.reload();
    }
      
    return(
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton onClick={rfrsh}>
            <IonIcon icon={refresh} />
          </IonFabButton>
        </IonFab>
    );
  };

  export default RefreshBtn;