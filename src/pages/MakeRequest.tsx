import React, { useState } from 'react';
import { IonPage, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonInput, IonList, IonItem } from '@ionic/react';
import PickRequestType from '../components/PickRequestType';
import RequestDescription from '../components/RequestDes';
import AddressPredictions from '../components/AddressInput';
import PlacesAutocomplete from '../components/AddressInput2'

const MakeRequest: React.FC = () => {
    const [text, setText] = useState<string>();
    
    return (
        <IonPage>
            <IonToolbar>
          <IonTitle>Make Request</IonTitle>
          <IonButtons slot="start">
          <IonBackButton defaultHref="/mapTab" />
        </IonButtons>
        </IonToolbar>
        <IonContent>
            <PickRequestType/>
            <RequestDescription/>
            <PlacesAutocomplete/>
        </IonContent>
        </IonPage>
    );
};

export default MakeRequest