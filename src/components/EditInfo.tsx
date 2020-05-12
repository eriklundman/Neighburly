import React, {useState} from 'react';
import {IonItem, IonInput, IonLabel } from '@ionic/react';


     const EditInfo: React.FC<any> = props => {
        const [gender, setGender] = useState<string>();
  
    return(
        <div>
          
        <IonItem>
        <IonLabel position="floating">First name</IonLabel>
            <IonInput value={props.fn} placeholder={props.userfn} onIonChange={e => props.setfn(e.detail.value!)}></IonInput>
          </IonItem>
        <IonItem>
        <IonLabel position="floating">Last name</IonLabel>
            <IonInput value={props.ln} placeholder={props.userln} onIonChange={e => props.setln(e.detail.value!)}></IonInput>
          </IonItem>
         
          </div>
          
    );
  };

  export default EditInfo;