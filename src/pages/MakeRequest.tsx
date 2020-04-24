import React, { useState } from "react";
import {
  IonPage,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
  IonItemDivider,
  IonItem,
  IonTextarea,
  IonList,
  IonListHeader,
  IonRadioGroup,
  IonLabel,
  IonRow,
  IonCol,
  IonRadio,
  IonIcon,
  IonDatetime,
} from "@ionic/react";
import PlacesAutocomplete from "../components/AddressInput";
import {
  pawOutline,
  flowerOutline,
  helpCircleOutline,
  basketOutline,
} from "ionicons/icons";

const MakeRequest: React.FC = () => {
  const [text, setText] = useState<string>();
  const [selected, setSelected] = useState<string>("other");
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [coords, setCoords] = useState([]);

  return (
    <IonPage>
      <IonToolbar>
        <IonTitle>Make Request</IonTitle>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/mapTab" />
        </IonButtons>
      </IonToolbar>
      <IonContent>
        <IonList>
          <IonRadioGroup
            value={selected}
            onIonChange={(e) => setSelected(e.detail.value)}>
      
            <IonLabel>Pick type of request</IonLabel>
   
            <IonRow>
              <IonCol>
                <IonRadio value="dog-walking" />
                <IonLabel> Dog walking</IonLabel>
                <IonIcon icon={pawOutline} size="large" />
              </IonCol>

              <IonCol>
                <IonRadio value="gardening" />
                <IonLabel> Gardening</IonLabel>
                <IonIcon icon={flowerOutline} size="large" />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonRadio value="other" />
                <IonLabel> Other</IonLabel>
                <IonIcon icon={helpCircleOutline} size="large" />
              </IonCol>

              <IonCol>
                <IonRadio value="shopping" />
                <IonLabel className="ion-text-center"> Shopping</IonLabel>
                <IonIcon icon={basketOutline} size="large" />
              </IonCol>
            </IonRow>
          </IonRadioGroup>
        </IonList>
        <div>
          <IonLabel>Description of your request</IonLabel>
          <IonItem>
            <IonTextarea
              placeholder="Enter more information here..."
              value={text}
              onIonChange={(e) => setText(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </div>

        <IonLabel>Address</IonLabel>
        <PlacesAutocomplete coords={coords} setCoords={setCoords}/>
        
        <IonLabel>Last date</IonLabel>
        <IonItem>
          <IonLabel position="floating">MM/DD/YYYY</IonLabel>
          <IonDatetime displayFormat="MM/DD/YYYY" min="2020-04-14" max="2021-12-09" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
        </IonItem>
        <IonButton>Submit request</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MakeRequest;
