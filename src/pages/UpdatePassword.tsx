import React, { useEffect, useState } from 'react';
import { IonPage, IonToolbar, IonGrid, IonFooter, IonTitle, IonHeader, IonButtons, IonBackButton, IonContent, IonLabel, IonItem, IonIcon, IonButton, IonItemGroup, IonRow, IonCol, IonAlert, IonList, IonInput } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { newPw } from "../firebaseConfig";
import * as firebase from 'firebase'
import HeaderLogga from '../components/HeaderLogga';
import { toast } from '../toast';
import { chevronBackOutline } from 'ionicons/icons';


const UpdatePassword: React.FC = () => {
    const db = firebase.firestore();
    const history = useHistory();
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newControlPassword, setNewControlPassword] = useState('')

    async function changePw() {

        var user: any = firebase.auth().currentUser;
        var email: any = firebase.auth().currentUser?.email
        var credential = firebase.auth.EmailAuthProvider.credential(
            email,
            currentPassword
        );

        // Prompt the user to re-provide their sign-in credentials

        user.reauthenticateWithCredential(credential).then(function () {
            if (newPassword === newControlPassword) {
                newPw(newPassword)
                toast("Password updated")
                history.goBack();
            }
            else {
                toast("New Password and Confirm New Password is not the same")
            }

        }).catch(function (error: any) {
            toast("Wrong Current Password")
            console.log(error)
        });

    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton text="" icon={chevronBackOutline} color="tertiary" defaultHref="/edituserprofile" />
                    </IonButtons>
                    <IonTitle className="ion-text-center" color="tertiary">Change Password</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>

                    <IonList>
                        <IonItem>
                            <IonLabel position="floating"> Current Password</IonLabel>
                            <IonInput
                                type="password"
                                onIonChange={(e: any) => setCurrentPassword(e.target.value)} /></IonItem>
                        <IonItem>
                            <IonLabel position="floating"> New Password</IonLabel>
                            <IonInput
                                type="password"
                                onIonChange={(e: any) => setNewPassword(e.target.value)} /></IonItem>
                        <IonItem>
                            <IonLabel position="floating"> Confirm New Password</IonLabel>
                            <IonInput
                                type="password"
                                onIonChange={(e: any) => setNewControlPassword(e.target.value)} /></IonItem>
                    </IonList>
                    <IonRow>
                        <IonButton text-color="tertiary" className="ion-text-capitalize" expand="full" onClick={changePw}>Update Password</IonButton>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>

    );


};

export default UpdatePassword