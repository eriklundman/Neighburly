import React, {useState} from 'react';
import { IonItem, IonLabel, IonContent, IonLoading, IonIcon} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../firebaseConfig'
import {toast} from "../toast";
import { trophyOutline } from 'ionicons/icons';


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
  <IonItem detail={true} routerLink="/menuTab/top10/">
  <IonLabel> Top 10  </IonLabel>
  <IonIcon color="warning" icon={trophyOutline}></IonIcon>
</IonItem>
<IonItem detail={true} routerLink="/menuTab/info/">
  <IonLabel> Info </IonLabel>
</IonItem>
<IonItem detail={true} routerLink="/menuTab/termsandconditions/">
  <IonLabel> Terms & Conditions </IonLabel>
</IonItem>
<IonItem button onClick = {logout}>
 <IonLabel color="danger">
    Log Out
    </IonLabel>
</IonItem>
</IonContent>
);
}

export default Menu;