import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    IonButton,
    IonInput,
    IonPage, IonLabel, IonList, IonContent, IonLoading, IonItem, IonHeader, IonToolbar, IonImg, IonButtons, IonIcon
} from '@ionic/react';
import { toast } from "../toast";
import * as firebase from 'firebase'
import { chevronBackOutline } from 'ionicons/icons';

const ForgotPassword: React.FC = () => {

    const [busy, setBusy] = useState<boolean>(false)
    const history = useHistory();
    const [email, setEmail] = useState('')

    function sendNewPW() {
        setBusy(true)
        firebase.auth().sendPasswordResetEmail(email).then(function () {
            // Email sent.
        }).catch(function (error) {
            // An error happened.
        });
        goToLogin()
        setBusy(false)
    }

    function goToLogin() {
        history.replace("/login")
    }


    return (

        <IonPage>
            <IonHeader>
                <IonToolbar className="header-toolbar-login">
                    <IonButtons slot="start">
                        <IonButton onClick={goToLogin}>
                            <IonIcon icon={chevronBackOutline} color="tertiary" />
                        </IonButton>
                    </IonButtons>
                    <IonImg className="loggan-login" src="assets/icon/logga3.png"> </IonImg>
                </IonToolbar>
            </IonHeader>
            <IonLoading spinner="circles" message="Please wait..." duration={0} isOpen={busy} />
            <IonContent>

                <IonList>
                    <IonItem>
                        <IonLabel position="floating"> Email address</IonLabel>
                        <IonInput
                            onIonChange={(e: any) => setEmail(e.target.value)} /></IonItem>

                    <IonButton text-color="tertiary" expand="block" className="login-button" onClick={sendNewPW}>Reset Password</IonButton>

                </IonList>

            </IonContent>
        </IonPage>

    );
};

export default ForgotPassword;
