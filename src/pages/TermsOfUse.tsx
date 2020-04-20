import React from 'react';
import { IonPage, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent } from '@ionic/react';


const TermsOfUse: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar>
          <IonTitle>Terms & Conditions</IonTitle>
          <IonButtons slot="start">
          <IonBackButton defaultHref="/menuTab" />
        </IonButtons>
        </IonToolbar>
        <IonContent>
        </IonContent>
        </IonPage>
    );
};

export default TermsOfUse