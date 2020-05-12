import React from 'react';
import {IonIcon, IonFab, IonFabButton, IonLabel } from '@ionic/react';
import {addOutline } from 'ionicons/icons';
import "./Addrequest.css";


const RequestBtn = () => {
    return(
      
      <div className="ion-text-center">
     
        <IonFab className="request-btn" vertical="top" horizontal="start" slot="fixed">
        <IonLabel className="rqst-fab"> Add</IonLabel>
          <IonFabButton className="rqst-fab" color="tertiary" size="small" routerLink="/mapTab/makerequest">
            <IonIcon icon={addOutline} size="large" />
          </IonFabButton>
          <IonLabel className="rqst-fab"> Request</IonLabel>
          </IonFab>

       
        </div>
        
    );
  };

  export default RequestBtn;