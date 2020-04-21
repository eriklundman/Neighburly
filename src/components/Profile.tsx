<<<<<<< Updated upstream
=======
import React, {useState, useEffect} from 'react';
import { IonContent, IonIcon, IonGrid, IonRow, IonText, IonLabel, IonSegment, IonSegmentButton, IonToolbar, IonCol} from '@ionic/react';

>>>>>>> Stashed changes

import { IonContent, IonGrid, IonIcon, IonLabel, IonRow, IonSegment, IonSegmentButton, IonText, IonToolbar } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import SettingsBtn from '../components/EditProfile';

const Profile: React.FC = () => {
<<<<<<< Updated upstream
  
=======
  const [mode, setMode] = useState('You have helped (antal) persons')

  useEffect(() => {
    console.log(`${mode}`)

  });
>>>>>>> Stashed changes

    return (
          <IonContent>
            <IonGrid>
              
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
            <IonIcon size="large" color="tertiary" icon={personCircleOutline}/>
            <IonText>Name of user</IonText>
          </IonCol>
          <IonCol></IonCol>
          </IonRow>

          <IonRow>
            <IonCol></IonCol>
            <IonCol>
            <SettingsBtn/>
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
         <IonSegmentButton onClick={() => setMode(mode==='You have helped (antal) persons' ? 'You have been helped by(antal) persons': 'You have helped (antal) persons')} value="helper" >
            <IonLabel>Helper</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton onClick={() => setMode(mode==='You have helped (antal) persons' ? 'You have been helped by(antal) persons': 'You have been helped by(antal) persons')} value="receiver" >
            <IonLabel>Receiver</IonLabel>
          </IonSegmentButton>
         </IonSegment>
         </IonToolbar>
         </IonRow>
         
         </IonGrid>
         </IonContent>
  );
  }

  export default Profile;
