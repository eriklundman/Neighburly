import React, {useState} from 'react';
import {IonIcon, IonButton, IonButtons, IonItem, IonText, IonRow, IonCol, IonBadge, IonGrid} from '@ionic/react';
import { personCircleOutline, 
    chatbubblesOutline, 
    checkmarkOutline,
    pawOutline,
    flowerOutline,
    helpCircleOutline,
    basketOutline } from 'ionicons/icons';
import './Request.css';



const Request: React.FC<any> = props => {
    let icon : any;
    if (props.item.type === "shopping") {
        icon = basketOutline;}
    if (props.item.type === "dog-walking") {
        icon = pawOutline;}
    if (props.item.type === "gardening") {
        icon = flowerOutline;}
    if (props.item.type === "other") {
        icon = helpCircleOutline;}


    return(

        <IonItem>
            <IonGrid>
                <IonRow>
                <IonCol> <div className="ion-align-self-start">
             <IonIcon color="tertiary" icon={personCircleOutline} size="large" slot="start"/>
             <IonText slot="end">{props.item.r_fn +" "+ props.item.r_ln}</IonText>
      </div> </IonCol>

        <IonCol><div className="ion-float-right">
       <IonButtons>
           <IonButton routerLink={`/chat/${props.item.chatId}`}>
                <IonIcon color="tertiary" icon={chatbubblesOutline} slot="icon-only"/>
           </IonButton>
       </IonButtons>
        </div> </IonCol>
        </IonRow>

        <IonRow>
            <IonCol><div className="ion-align-self-start">
            <IonIcon color="tertiary" icon={icon}/>
                 {props.item.des} </div></IonCol>
                <IonCol><div className="ion-float-right">
       <IonButtons> <IonButton>
        <IonIcon color="success" icon={checkmarkOutline} slot="icon-only"/>
        </IonButton></IonButtons>
        </div> </IonCol>
        </IonRow>
        </IonGrid>
        </IonItem>

    );
  };

  export default Request;