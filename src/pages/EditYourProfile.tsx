import React from 'react';
import { IonPage, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonLabel } from '@ionic/react';



const EditYourProfile: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar>
          <IonTitle>Edit Profile</IonTitle>
          <IonButtons slot="start">
          <IonBackButton defaultHref="/profileTab" />
        </IonButtons>
        </IonToolbar>
        <IonContent>
            <IonLabel>Hej</IonLabel>
         </IonContent>
        </IonPage>
    );
};

export default EditYourProfile