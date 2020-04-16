import React, { useState } from 'react';
import { IonContent, IonTextarea, IonItem, IonItemDivider} from '@ionic/react';

const RequestDescription: React.FC = () => {
  const [text, setText] = useState<string>();

  return (
     <div>
    <IonItemDivider>Description of your request</IonItemDivider>
    <IonItem>
      <IonTextarea placeholder="Enter more information here..." value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
    </IonItem>
    </div>
  );
};

export default RequestDescription