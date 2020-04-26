import React, {useState} from 'react';
import {IonIcon, IonList, IonCard, IonCardContent, IonLabel, IonTextarea, IonContent, IonButton, IonButtons, IonItem, IonText, IonRow, IonCol, IonBadge, IonToolbar, IonItemDivider, IonGrid, IonItemGroup} from '@ionic/react';
import { personCircleOutline, 
    chatbubblesOutline, 
    checkmarkDoneOutline,
    pawOutline,
    flowerOutline,
    helpCircleOutline,
    basketOutline } from 'ionicons/icons';
import './Request.css';



const Request = () => {
  

    return(
        
        <IonItem>
            <IonGrid>
                <IonRow>
                <IonCol> <div className="ion-align-self-start">
             <IonIcon color="tertiary" icon={personCircleOutline} size="large" slot="start"/>
             <IonText slot="end">Username</IonText>
      </div> </IonCol>

        <IonCol><div className="ion-float-right">
       <IonButtons> <IonButton>
        <IonIcon color="tertiary" icon={chatbubblesOutline} slot="icon-only"/>
        </IonButton></IonButtons>
        </div> </IonCol>
        </IonRow>

        <IonRow>
            <IonCol><div className="ion-align-self-start">
            <IonIcon color="tertiary" icon={pawOutline}/>
                requestinfo</div></IonCol>
                <IonCol><div className="ion-float-right">
            <IonIcon color="success" icon={checkmarkDoneOutline} size="large"/>
                </div></IonCol>
        </IonRow>
        </IonGrid>
        </IonItem>
          
    );
  };

  export default Request;