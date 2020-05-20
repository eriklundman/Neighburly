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
          <div className="add-grid">
            <div>
          <IonRadioGroup
            value={selected}
            onIonChange={(e) => setSelected(e.detail.value)}>

              <IonItem lines="none">
            <IonText> <h3> Pick type of request </h3></IonText>
            </IonItem>
       
                <IonItem className="request-option" lines="none">
                <IonRadio slot="start" className="radioDesign" value="dog-walking" />
                <IonLabel color="tertiary"> Dog walking</IonLabel>
                <IonIcon slot="end" color="tertiary" icon={pawOutline} size="large" />
                </IonItem>
            
           
                <IonItem lines="none">
                <IonRadio slot="start" className="radioDesign" value="gardening" />
                <IonLabel color="tertiary"> Gardening</IonLabel>
                <IonIcon slot="end" color="tertiary" icon={flowerOutline} size="large" />
                </IonItem>
              
                <IonItem lines="none">
                <IonRadio slot="start" className="radioDesign" value="other" />
                <IonLabel color="tertiary"> Other</IonLabel>
                <IonIcon slot="end" color="tertiary" icon={helpCircleOutline} size="large" />
                </IonItem>

                <IonItem lines="none">
                <IonRadio slot="start" className="radioDesign" value="shopping" />
                <IonLabel color="tertiary"> Shopping</IonLabel>
                <IonIcon slot="end" color="tertiary" icon={cartOutline} size="large" />
                </IonItem>

          </IonRadioGroup>
          </div>
        <div>
        <IonItem lines="none">
          <b>Short description (maximum 100 characters)</b>
          </IonItem>
        <IonItem lines="none">
        <div className="information-div">
         <textarea className="address-input-field"
         maxLength = {100}
         value={text}
         placeholder="Short description of your request..."
         onChange={(e) => setText(e.target.value!)}
         /></div></IonItem>
         

        </div>
        <div>
          <IonItem lines="none">
        <b>Where do you want help?</b>
        </IonItem >
        <IonItem lines="none">
        <PlacesAutocomplete coords={coords} setCoords={setCoords}/>
        </IonItem>

        <IonButton className="submit-rqst" expand='block' onClick={sendRequest}>Submit request
        </IonButton>
        </div>
        </div>
        </IonContent>
        </IonPage>
);

};



export default MakeRequest;
