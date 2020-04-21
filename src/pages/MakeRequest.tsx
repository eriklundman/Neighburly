import React, { useState } from 'react';
import { IonPage, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonInput, IonList, IonItem } from '@ionic/react';
import PickRequestType from '../components/PickRequestType';
import RequestDescription from '../components/RequestDes';
import AddressPredictions from '../components/AddressInput';
import PlacesAutocomplete from '../components/AddressInput2';
import DateTimeExamples from '../components/DatePicker';
import GeolocationButton from '../components/CoordBtn'

const MakeRequest: React.FC = () => {
    
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
            <DateTimeExamples/>
        </IonContent>
        </IonPage>
    );
};

export default MakeRequest