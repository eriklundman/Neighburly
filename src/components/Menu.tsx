import React from 'react';
import { IonItem, IonLabel, IonContent, IonIcon} from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';

const Menu: React.FC = () => {
  return (
    <IonContent>
<IonItem routerLink="/mapTab">
  <IonLabel> Info </IonLabel>
  <IonIcon icon={arrowForwardOutline} slot="end" />
</IonItem>
<IonItem routerLink="/mapTab">
  <IonLabel> Terms & Conditions </IonLabel>
</IonItem>
</IonContent>
);
}

export default Menu;