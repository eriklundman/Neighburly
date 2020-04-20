import React from 'react';
import { IonPage, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent } from '@ionic/react';


const GetInfo: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar>
          <IonTitle>Info</IonTitle>
          <IonButtons slot="start">
          <IonBackButton defaultHref="/menuTab" />
        </IonButtons>
        </IonToolbar>
        <IonContent>
        </IonContent>
        </IonPage>
    );
};

export default GetInfo