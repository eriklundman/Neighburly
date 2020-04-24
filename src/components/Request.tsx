import React, {useState} from 'react';
import {IonIcon, IonTextarea, IonContent, IonButton, IonButtons, IonItem, IonText, IonRow, IonBadge, IonToolbar, IonItemDivider, IonGrid, IonItemGroup} from '@ionic/react';
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

        <IonToolbar>
            <IonItemGroup>
                <IonItemDivider>
        <IonIcon color="tertiary" icon={personCircleOutline} slot="start" size="large"/>
        <IonText>User name</IonText>
        <IonIcon color="tertiary" icon={chatbubblesOutline} slot="end"/>
        <IonBadge className="badge" color="danger" slot="end">1</IonBadge>
        </IonItemDivider>

        <IonItemDivider>
            <IonIcon color="tertiary" icon={pawOutline} slot="start"/>
        </IonItemDivider>

        <IonItemDivider>
            <IonTextarea placeholder="Preview of requestinfo..">

            </IonTextarea>
        <IonIcon color="success" icon={checkmarkDoneOutline} slot="end"/>

        </IonItemDivider>
        </IonItemGroup>
        </IonToolbar>
       
    );
  };

  export default Request;