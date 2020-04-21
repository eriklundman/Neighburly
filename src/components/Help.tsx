import React, {useState, useEffect} from 'react';
import { IonSegmentButton, IonLabel, IonContent, IonSegment} from '@ionic/react';
/* kolla detta https://www.youtube.com/watch?v=44Avd9NBf7M elements, inte string */
const Help: React.FC = () => {
    const [mode, setMode] = useState('You have helped (antal) persons')

useEffect(() => {
        console.log(`${mode}`)
         
});
    
  return (
    <IonContent>
         <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
          <IonSegmentButton onClick={() => setMode(mode==='You have helped (antal) persons' ? 'You have been helped by(antal)': 'You have helped (antal) persons')} value="activehelps" >
            <IonLabel>Active helps</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton onClick={() => setMode(mode==='You have helped (antal) persons' ? 'You have been helped by(antal)': 'You have been helped by(antal)')} value="inactivehelps" >
            <IonLabel>Inactive helps</IonLabel>
          </IonSegmentButton>
         </IonSegment>
         <p>{mode}</p>
</IonContent>
);
}

export default Help;