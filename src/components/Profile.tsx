
import React, {useState, useEffect} from 'react';
import {
    IonContent,
    IonIcon,
    IonRow,
    IonCol,
    useIonViewDidEnter,
    IonTitle
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

                <IonRow>
                    <IonCol size="4"><div className="ion-float-right">
                    <IonIcon slot="end" size="large" color="tertiary" icon={personCircleOutline} />
                      </div></IonCol>
                    <IonCol className="hejsan"><div>
                        <IonTitle>{fn} {ln}</IonTitle>
                        </div> </IonCol>
                        <IonCol></IonCol>
                </IonRow>

        </IonContent>
    );
}

export default Profile;