import React, {useEffect, useState} from 'react';
import { IonPage, IonToolbar, IonTitle, IonHeader, IonButtons, IonBackButton, IonContent, IonLabel, IonItem, IonIcon, IonButton, IonItemGroup, IonRow, IonCol } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import EditRadius from '../components/EditRadius'
import EditInfo from '../components/EditInfo';
import HeaderLogga from '../components/HeaderLogga';
import {getUserInfo, updateDatabase} from "../firebaseConfig";
import {toast} from "../toast";
import { useHistory } from 'react-router-dom';



const EditYourProfile: React.FC = () => {
    const history = useHistory();
    //user info from database
    const [userfn, setUserFn] = useState('');
    const [userln, setUserLn] = useState('');
    const [userRadius, setUserRadius] = useState(0);

    //input values
    const [fn, setfn] = useState<string>("");
    const [ln, setln] = useState<string>("");
    const [radius, setRadius] = useState(0);

    useEffect(() => {
        if (getUserInfo() !== undefined) {
            getUserInfo().then((result: any) => {
                setUserRadius(result.radius / 1000);
                setUserFn(result.firstname);
                setUserLn(result.lastname);
            });
        }
    }, [userfn]);

    useEffect(() => {
        setRadius(userRadius)// This is be executed when `userRadius` state changes
    }, [userRadius]);

    useEffect(() => {
        setfn(userfn)// This is be executed when `userRadius` state changes
    }, [userfn]);

    useEffect(() => {
        setln(userln)// This is be executed when `userRadius` state changes
    }, [userln]);

    //console.log(userRadius)
    async function update() {
        if (fn === "" || ln === "") {
            return toast("You need to enter first- and lastname")
        }
        await updateDatabase(radius, fn, ln)
        history.goBack();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <HeaderLogga/>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonItem>
                    <IonButtons slot="start">
                        <IonBackButton text="" color="tertiary" defaultHref="/profileTab" />
                    </IonButtons>
                    <IonTitle color="tertiary"> Edit profile </IonTitle>
                    <IonIcon color="tertiary" icon={settingsOutline} slot="start"/>
                </IonItem>

                <EditRadius radius={radius} setRadius={setRadius} />

                <EditInfo userfn={userfn} userln={userln} fn={fn} setfn={setfn} ln={ln} setln={setln} />

                <IonRow>
                    <IonCol/>
                    <IonCol>
                        <IonButtons>
                            <IonButton expand="block" className="ion-text-capitalize" color="secondary">Change password</IonButton>
                        </IonButtons>
                    </IonCol>
                    <IonCol/>
                </IonRow>
                <IonRow>
                    <IonCol/>
                    <IonCol>
                        <IonButton expand="block" onClick={update} >Save changes</IonButton>
                    </IonCol>
                    <IonCol/>
                </IonRow>
                <IonRow>
                    <IonCol/>
                    <IonCol>
                        <IonButton expand="block" color="danger">Delete account</IonButton>
                    </IonCol>
                    <IonCol/>
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default EditYourProfile
