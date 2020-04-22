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
import AddressPredictions from "../components/AddressInput";
import PlacesAutocomplete from "../components/AddressInput2";
import {
  pawOutline,
  flowerOutline,
  helpCircleOutline,
  basketOutline,
} from "ionicons/icons";

const MakeRequest: React.FC = () => {
  const [text, setText] = useState<string>();
  const [selected, setSelected] = useState<string>("other");
  const [selectedDate, setSelectedDate] = useState<string>('2020-04-15T13:47:20.789');

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
            <IonListHeader>
              <IonLabel>Pick type of request</IonLabel>
            </IonListHeader>
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
          <IonItemDivider>Description of your request</IonItemDivider>
          <IonItem>
            <IonTextarea
              placeholder="Enter more information here..."
              value={text}
              onIonChange={(e) => setText(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </div>
        <PlacesAutocomplete coords={coords} setCoords={setCoords}/>
        
        <IonItem>
          <IonLabel position="floating">MM/DD/YYYY</IonLabel>
          <IonDatetime displayFormat="MM/DD/YYYY" min="2020-04-14" max="2021-12-09" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
        </IonItem>
        <IonButton>Submit request</IonButton>
  <h2>lat:{coords[0]} long:{coords[1]} type:{selected} date: {selectedDate} description:{text}</h2>
      </IonContent>
    </IonPage>
  );
};

export default MakeRequest;
