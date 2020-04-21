import React from 'react';
import { IonItem, IonLabel, IonContent, IonIcon, IonButton, IonButtons} from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';

const Menu: React.FC = () => {
  return (
    <IonContent>
<IonItem routerLink="/menuTab/info/">
  <IonLabel> Info </IonLabel>
  <IonIcon icon={arrowForwardOutline} slot="end" />
</IonItem>
<IonItem routerLink="/menuTab/termsandconditions/">
  <IonLabel> Terms & Conditions </IonLabel>
  <IonIcon icon={arrowForwardOutline} slot="end" />
</IonItem>
<IonItem>
  <IonButtons>
  <IonButton className="ion-text-capitalize" color="danger">
    Log Out
  </IonButton>
  </IonButtons>
</IonItem>
</IonContent>
);
}

export default Menu;