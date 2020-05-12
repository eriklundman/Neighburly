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
  IonRadioGroup,
  IonLabel,
  IonRow,
  IonCol,
  IonRadio,
  IonIcon,
  IonContent,
  IonHeader,
  IonText,
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
  const [coords, setCoords] = useState([]);

  function sendRequest() {
    if (text.trim() === '') {
      return toast("Enter a description for the request!")
    }
    if (coords.length===0) {
      return toast('Pick a valid address for your request!')
    }
    if (text.trim() !== '' ||  coords !== []) {
      const req = createRequest(text, selected, coords)

      if (req) {
        history.push('/tabs');
        setText("")
        setSelected("other")
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
        <IonItem className="description-input" >
          <IonLabel style={{fontSize: 12}}>Short description of your request (maximum 100 characters)</IonLabel>
          </IonItem>
        <IonItem>
        <div className="information-div">
         <input className="address-input-field"
         type="text"
         maxLength = {100}
         value={text}
         placeholder="Enter more information here..."
         onChange={(e) => setText(e.target.value!)}
         /></div></IonItem>
         

        </div>
          <IonItem>
        <IonLabel style={{fontSize: 12}}>Request location (Be as specific as you want)</IonLabel>
        </IonItem >
        <IonItem>
        <PlacesAutocomplete coords={coords} setCoords={setCoords} />
        </IonItem>
        <IonButton expand='block' onClick={sendRequest}>Submit request
        </IonButton>
        </IonContent>
        </IonPage>
);

};



export default MakeRequest;
