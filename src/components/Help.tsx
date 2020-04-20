import React from 'react';
import { IonSegmentButton, IonLabel, IonContent, IonSegment} from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';

const Help: React.FC = () => {
  return (
    <IonContent>
         <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
          <IonSegmentButton value="activehelps">
            <IonLabel>Active helps</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="inactivehelps">
            <IonLabel>Inactive helps</IonLabel>
          </IonSegmentButton>
         </IonSegment>
</IonContent>
);
}

export default Help;