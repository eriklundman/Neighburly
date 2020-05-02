
import React, {useState, useEffect} from 'react';
import {
    IonContent,
    IonIcon,
    IonGrid,
    IonRow,
    IonText,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonToolbar,
    IonCol,
    useIonViewDidEnter
} from '@ionic/react';
import {getUserInfo} from '../firebaseConfig'

import { personCircleOutline } from 'ionicons/icons';
import './Profile.css';


const Profile: React.FC = () => {
    const [fn, setFn] = useState('');
    const [ln, setLn] = useState('');
    const [email, setEmail] = useState('');


    useIonViewDidEnter(() => {
        getUserInfo().then((result: any) => {
            if(result !== undefined){
                setFn(result.firstname);
                setLn(result.lastname);
                setEmail(result.email)
            }
        });
    });



    return (
        <IonContent>

                <IonRow className="ion-align-items-end">
                    <IonCol><div className="ion-float-right">
                    <IonIcon size="large" color="tertiary" icon={personCircleOutline} />
                      </div></IonCol>
                    <IonCol><div className="ion-float-left">
                        <IonText>{fn} {ln}</IonText>
                        </div> </IonCol>
                    <IonCol></IonCol>
                </IonRow>

        </IonContent>
    );
}

export default Profile;