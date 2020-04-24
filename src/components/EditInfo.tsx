import React, {useState} from 'react';
import {IonItem, IonInput, IonSelectOption, IonSelect, IonLabel } from '@ionic/react';
import {getUserInfo} from '../firebaseConfig';


     const EditInfo: React.FC<any> = props => {
        const [text, setText] = useState<string>();
        const [gender, setGender] = useState<string>();
  
    return(
        <div>
          <IonLabel position="floating">First name</IonLabel>
        <IonItem>
            <IonInput value={text} placeholder={props.fn} onIonChange={e => setText(e.detail.value!)}></IonInput>
          </IonItem>
          <IonLabel position="floating">Last name</IonLabel>
        <IonItem>
            <IonInput value={text} placeholder={props.ln} onIonChange={e => setText(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
          <IonLabel position="floating">Gender</IonLabel>
            <IonSelect interface="popover" value={gender} placeholder="Female/male" onIonChange={e => setGender(e.detail.value)}>
              <IonSelectOption value="female">Female</IonSelectOption>
              <IonSelectOption value="male">Male</IonSelectOption>
              <IonSelectOption value="other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>
         
          </div>
          
    );
  };

  export default EditInfo;