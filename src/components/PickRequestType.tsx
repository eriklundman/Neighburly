import React from 'react';
import { IonList, IonRadioGroup, IonListHeader, IonLabel, IonRadio, IonItem, IonContent, IonGrid, IonCol, IonRow, IonIcon } from '@ionic/react';
import { flowerOutline, pawOutline, basketOutline, helpCircleOutline } from 'ionicons/icons';

const PickRequestType: React.FC = () => (
    <IonList>
      <IonRadioGroup>
        <IonListHeader>
          <IonLabel>
            Pick type of request
          </IonLabel>
        </IonListHeader>
        <IonRow>
        <IonCol>
        <IonRadio value="dog-walking" />
          <IonLabel> Dog walking</IonLabel>
          <IonIcon icon={pawOutline} size="large"/>
        </IonCol>

        <IonCol>
        <IonRadio value="gardening" />
          <IonLabel> Gardening</IonLabel>
          <IonIcon icon={flowerOutline} size="large"/>
        </IonCol>
        </IonRow>
        <IonRow>
        <IonCol>
        <IonRadio value="other" />
          <IonLabel> Other</IonLabel>
          <IonIcon icon={helpCircleOutline} size="large"/>
        </IonCol>

        <IonCol>
        <IonRadio value="shopping"/>
          <IonLabel className="ion-text-center"> Shopping</IonLabel>
          <IonIcon icon={basketOutline} size="large"/>
        </IonCol>
        </IonRow>
      </IonRadioGroup>
    </IonList>
);

export default PickRequestType