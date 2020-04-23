import React, {useState} from 'react';
import { IonItem, IonLabel, IonContent, IonIcon, IonButton, IonButtons, IonLoading} from '@ionic/react';
import { arrowForwardOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../firebaseConfig'
import {toast} from "../toast";


const Menu: React.FC = () => {
  const [busy, setBusy] = useState(false);
  const history = useHistory();

  async function logout() {
    setBusy(true);
    await logoutUser();
    setBusy(false);
    history.replace('/login')
    await toast("Logged out")

  }
  return (
    <IonContent>
      <IonLoading message="Logging out..." duration={0} isOpen={busy}/>
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
  <IonButton onClick ={logout} className="ion-text-capitalize" color="danger">
    Log Out
  </IonButton>
  </IonButtons>
</IonItem>
</IonContent>
);
}

export default Menu;