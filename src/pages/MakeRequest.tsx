import React from 'react';
import { IonPage, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent } from '@ionic/react';
import PickRequestType from '../components/PickRequestType';
import RequestDescription from '../components/RequestDes'

const MakeRequest: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar>
          <IonTitle>Make Request</IonTitle>
          <IonButtons slot="start">
          <IonBackButton defaultHref="/mapTab" />
        </IonButtons>
        </IonToolbar>
        <IonContent>
            <PickRequestType/>
            <RequestDescription/>
        </IonContent>
        </IonPage>
    );
};

export default MakeRequest