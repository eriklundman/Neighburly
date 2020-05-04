import React from 'react';
import { IonPage, IonIcon, IonToolbar, IonCol, IonTitle, IonButtons, IonBackButton, IonContent, IonHeader, IonRow, IonGrid } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';


const GetInfo: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
             <IonToolbar color="primary">
             <IonTitle className="ion-text-center" color="tertiary">Info</IonTitle>
                  <IonButtons slot="start">
                 <IonBackButton text="" icon={chevronBackOutline} color="tertiary" defaultHref="/menuTab" />
              </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent>
        </IonContent>
        </IonPage>
    );
};

export default GetInfo