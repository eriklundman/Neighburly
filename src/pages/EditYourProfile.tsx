import React, { useEffect, useState } from 'react';
import { IonPage, IonToolbar, IonGrid, IonFooter, IonTitle, IonHeader, IonButtons, IonBackButton, IonContent, IonLabel, IonItem, IonIcon, IonButton, IonItemGroup, IonRow, IonCol, IonAlert } from '@ionic/react';
import { settingsOutline, chevronBackOutline } from 'ionicons/icons';
import EditRadius from '../components/EditRadius'
import EditInfo from '../components/EditInfo';
import { getUserInfo, updateDatabase, deleteAccount } from "../firebaseConfig";
import { toast } from "../toast";
import { useHistory } from 'react-router-dom';
import './EditYourProfile.css';




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
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    useEffect(() => {
        if (getUserInfo() !== undefined) {
            getUserInfo().then((result: any) => {
                setUserRadius(result.radius / 1000);
                setUserFn(result.firstname);
                setUserLn(result.lastname);
            });
        }
    }, []);

    useEffect(() => {
        setRadius(userRadius)// This is be executed when `userRadius` state changes
    }, [userRadius]);

    useEffect(() => {
        setfn(userfn)// This is be executed when `userRadius` state changes
    }, [userfn]);

    useEffect(() => {
        setln(userln)// This is be executed when `userRadius` state changes
    }, [userln]);


    async function update() {
        if (fn === "" || ln === "") {
            return toast("You need to enter first- and lastname")
        }
        await updateDatabase(radius, fn, ln)
        history.goBack();
    }

    function deleteClicked(){
        setShowDeleteAlert(true);
    }

    function deleteUser() {
        deleteAccount()
        history.push('/login');
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton text="" icon={chevronBackOutline} color="tertiary" defaultHref="/profileTab" />
                    </IonButtons>
                    <IonTitle className="ion-text-center" color="tertiary">Edit profile</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent scrollEvents={true}>

                <EditRadius radius={radius} setRadius={setRadius} />


                <EditInfo userfn={userfn} userln={userln} fn={fn} setfn={setfn} ln={ln} setln={setln} />
                <IonCol></IonCol>
                <IonCol>
                    <IonRow>

                        <IonButton className="hej" expand="block" onClick={update}>Save changes</IonButton>

                    </IonRow>
                    <IonRow>
                        <IonButtons>
                            <IonButton expand="block" className="ion-text-capitalize" color="secondary">Change password</IonButton>
                        </IonButtons>
                    </IonRow>
                </IonCol>
                <IonCol></IonCol>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButtons>
                        <IonButton className="centreraKnapp" expand="block" color="danger" onClick={deleteClicked}>Delete account</IonButton>
                    </IonButtons>

                    <IonAlert
                        isOpen={showDeleteAlert}
                        onDidDismiss={() => setShowDeleteAlert(false)}
                        header={'Confirm!'}
                        message={'Are you sure you want to delete your account?'}
                        buttons={['Cancel',
                            {
                                text: 'Delete',
                                
                                handler: () => {
                                    deleteUser();
                                }
                            }
                        ]}
                    />
                </IonToolbar>
            </IonFooter>

        </IonPage>
    );
};

export default EditYourProfile
