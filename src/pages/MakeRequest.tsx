import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonItem,
  IonTextarea,
  IonRadioGroup,
  IonLabel,
  IonRow,
  IonCol,
  IonRadio,
  IonIcon,
  IonDatetime,
  IonContent,
  IonHeader,
  IonText
} from "@ionic/react";
import PlacesAutocomplete from "../components/AddressInput";
import {
  pawOutline,
  flowerOutline,
  helpCircleOutline,
  cartOutline,
  chevronBackOutline
} from "ionicons/icons";
import { toast } from "../toast";
import { createRequest } from "../firebaseConfig"
import './MakeRequest.css';


const MakeRequest: React.FC = () => {

  let history = useHistory()

  const [text, setText] = useState<string>("");
  const [selected, setSelected] = useState<string>("other");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [coords, setCoords] = useState([]);

  function sendRequest() {
    if (text.trim() === '') {
      toast("Enter a description for the request!")
    }
    if (selectedDate === '') {
      toast('Choose a "latest date" for your request!')
    }
    if (coords === []) {
      toast('Pick an address for your request!')
    }
    if (text.trim() !== '' || selectedDate !== '' || coords !== []) {
      const req = createRequest(text, selected, selectedDate, coords)

      if (req) {
        history.push('/tabs');
        setText("")
        setSelected("other")
        setSelectedDate("")
        setCoords([])
      }
    }
  }

  return (
<IonPage>
      <IonContent scrollEvents= {true}>
      <IonHeader>
             <IonToolbar color="primary">
             <IonTitle className="ion-text-center" color="tertiary">Make request</IonTitle>
                  <IonButtons slot="start">
                 <IonBackButton text="" icon={chevronBackOutline} color="tertiary" defaultHref="/mapTab" />
              </IonButtons>
            </IonToolbar>
        </IonHeader>

          <IonRadioGroup
            value={selected}
            onIonChange={(e) => setSelected(e.detail.value)}>

              <IonRow className="ion-justify-content-center">
            <IonText> <h3> Pick type of request </h3></IonText>
            </IonRow>
            <IonRow>
              <IonCol className="ion-justify-content-center">
                <IonRadio className="radioDesign" value="dog-walking" />
                <IonLabel color="tertiary"> Dog walking</IonLabel>
                <IonIcon color="tertiary" icon={pawOutline} size="large" />
              </IonCol>

              <IonCol>
                <IonRadio className="radioDesign" value="gardening" />
                <IonLabel color="tertiary"> Gardening</IonLabel>
                <IonIcon color="tertiary" icon={flowerOutline} size="large" />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonRadio className="radioDesign" value="other" />
                <IonLabel color="tertiary"> Other</IonLabel>
                <IonIcon color="tertiary" icon={helpCircleOutline} size="large" />
              </IonCol>

              <IonCol>
                <IonRadio className="radioDesign" value="shopping" />
                <IonLabel color="tertiary"> Shopping</IonLabel>
                <IonIcon color="tertiary" icon={cartOutline} size="large" />
              </IonCol>
            </IonRow>

          </IonRadioGroup>

        <div>
        <IonItem>
          <IonLabel>Description of your request</IonLabel>
          </IonItem>
          <IonItem>
            <IonTextarea
              className="requestInputs"
              placeholder="Enter more information here..."
              value={text}
              onIonChange={(e) => setText(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </div>
          <IonItem>
        <IonLabel>Address</IonLabel>
        </IonItem>
        <IonItem>
        <PlacesAutocomplete coords={coords} setCoords={setCoords} />
        </IonItem>
        <IonLabel>Last date</IonLabel>
        <IonItem>
          
          <IonLabel position="floating">MM/DD/YYYY</IonLabel>
          <IonDatetime
            displayFormat="MM/DD/YYYY"
            min="2020-04-14"
            max="2021-12-09"
            value={selectedDate}
            onIonChange={(e) => setSelectedDate(e.detail.value!)}
          ></IonDatetime>
        </IonItem>
        <IonButton expand='block' onClick={sendRequest}>Submit request
        </IonButton>
        </IonContent>
        </IonPage>
);

};



export default MakeRequest;
