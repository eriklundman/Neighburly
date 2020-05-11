import React from 'react';
import { IonButton, IonButtons, IonItem, IonText } from '@ionic/react';


const ChangePassword = () => {
    return (
        <IonButtons>
            <IonButton expand="block" className="ion-text-capitalize">
                <IonItem routerLink="/updatepassword">
                    <IonText  color="secondary">Change Password </IonText>
                </IonItem>
            </IonButton>
        </IonButtons>


    );
};

export default ChangePassword;