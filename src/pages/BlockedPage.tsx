import React, {useState } from 'react';
import { IonPage, IonToolbar, IonGrid, IonTitle, IonHeader, IonButtons, IonBackButton, IonContent, IonLabel, IonItem, IonButton, IonRow, IonList, IonInput, IonFooter } from '@ionic/react';
import { logoutUser } from '../firebaseConfig';


const BlockedPage: React.FC = () => {
    


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle className="ion-text-center" color="tertiary"><h1>BLOCKED</h1></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLabel>
                    <h2>You are blocked from using Neighburly</h2>
                </IonLabel>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButtons>
                        <IonButton color="danger" onClick={() => {
                            logoutUser()
                            window.location.reload();
                        }}>
                            Log Out
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonPage>

    );


};

export default BlockedPage