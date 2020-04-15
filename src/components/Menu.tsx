import React from 'react';
import { IonItem, IonLabel, IonContent,} from '@ionic/react';

const Menu: React.FC = () => {
  return (
    <IonContent>
<IonItem routerLink="/mapTab">
  <IonLabel> Info </IonLabel>
</IonItem>
<IonItem routerLink="/mapTab">
  <IonLabel> Terms & Conditions </IonLabel>
</IonItem>
</IonContent>
);
}

export default Menu;