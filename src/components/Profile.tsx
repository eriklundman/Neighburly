
import React, {useState, useEffect} from 'react';
<<<<<<< Updated upstream
import { IonContent, IonIcon, IonGrid, IonRow, IonText, IonLabel, IonSegment, IonSegmentButton, IonToolbar, IonCol} from '@ionic/react';
import {credChange, getUserInfo} from '../firebaseConfig'
=======
import { IonPage, IonContent, IonIcon, IonGrid, IonRow, IonText, IonLabel, IonSegment, IonSegmentButton, IonToolbar, IonCol} from '@ionic/react';
import {getUserInfo} from '../firebaseConfig'
>>>>>>> Stashed changes

import { personCircleOutline } from 'ionicons/icons';
import './Profile.css';


const Profile: React.FC = () => {
    const [mode, setMode] = useState('You have helped (antal) persons');
    const [fn, setFn] = useState('');
    const [ln, setLn] = useState('');
    const [email, setEmail] = useState('');
    const [update, setUpdate] = useState(false)


    useEffect(() => {
        getUserInfo().then((result: any) => {
            if(result !== undefined){
                setFn(result.firstname);
                setLn(result.lastname);
                setEmail(result.email)
            }
        });
<<<<<<< Updated upstream
        setUpdate(false)
    },[update]);


    if (credChange()) {
        setUpdate(true)
    }


    return (
        <IonContent>
            <IonGrid>

                <IonRow>
                    <IonCol></IonCol>
                    <IonCol>
                        <IonIcon size="large" color="tertiary" icon={personCircleOutline} />
                        <IonText>{fn} {ln}</IonText>
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>

                <IonRow>
                    <IonCol></IonCol>
                    <IonCol>
                        <SettingsBtn />
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>


                <IonRow>
                    <IonCol></IonCol>
                    <IonCol className="ion-text-center">
                        <p>{mode}</p>
                    </IonCol>
                    <IonCol></IonCol>
                </IonRow>

                <IonRow>
                    <IonToolbar>
                        <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
                            <IonSegmentButton onClick={() => setMode(mode === 'You have helped (antal) persons' ? 'You have been helped by(antal) persons' : 'You have helped (antal) persons')} value="helper" >
                                <IonLabel>Helper</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton onClick={() => setMode(mode === 'You have helped (antal) persons' ? 'You have been helped by(antal) persons' : 'You have been helped by(antal) persons')} value="receiver" >
                                <IonLabel>Receiver</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </IonToolbar>
                </IonRow>

            </IonGrid>
        </IonContent>
    );
=======
    



  return (
    <IonContent>

        <IonRow className="ion-align-items-end">
          <IonCol><div className="ion-float-right">
            <IonIcon size="large" color="tertiary" icon={personCircleOutline} />
            </div> </IonCol>
            <IonCol><div className="ion-float-left">
            <IonText>{fn} {ln}</IonText>
            </div> </IonCol>
            <IonCol></IonCol>
        </IonRow>

    </IonContent>
    
   
  );
>>>>>>> Stashed changes
}

export default Profile;