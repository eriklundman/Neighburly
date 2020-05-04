import React from 'react';
import {IonIcon, IonButton, IonButtons, IonItem, IonText, IonRow, IonCol, IonGrid} from '@ionic/react';
import { personCircleOutline,
    checkmarkDoneOutline,
    pawOutline,
    flowerOutline,
    helpCircleOutline,
    cartOutline } from 'ionicons/icons';
import './Request.css';



const RequestOnMap: React.FC<any> = props => {
    let icon : any;
    if (props.item.type === "shopping") {
        icon = cartOutline;}
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
                        <IonText slot="end">{props.item.r_fn + " " + props.item.r_ln} </IonText>
                    </div> </IonCol>

                    <IonCol><div className="ion-float-right">
                        <IonButtons> <IonButton>
                        </IonButton></IonButtons>
                    </div> </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol><div className="ion-align-self-start">
                        <IonIcon color="tertiary" icon={icon}/>
                        {props.item.des} </div></IonCol>
                    <IonCol><div className="ion-float-right">
                        <IonIcon color="success" icon={checkmarkDoneOutline} size="large"/>
                    </div></IonCol>
                </IonRow>
            </IonGrid>
        </IonItem>

    );
};

export default RequestOnMap;