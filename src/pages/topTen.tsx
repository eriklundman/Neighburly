import React from 'react'
import { IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonButtons, IonBackButton } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';

const topTen: React.FC = () => { 
return (
    <IonPage>
        <IonHeader>
            <IonToolbar color="primary">
            <IonTitle color="tertiary">Top 10</IonTitle>
          <IonButtons slot="start">
          <IonBackButton text="" icon={chevronBackOutline} color="tertiary" defaultHref="/menuTab" />
        </IonButtons>

            </IonToolbar>

        </IonHeader>
        <IonContent>

        </IonContent>
    </IonPage>
)

}

export default topTen;