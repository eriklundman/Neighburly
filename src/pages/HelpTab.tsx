import React from 'react';
import {IonPage, IonHeader, IonToolbar, IonImg} from '@ionic/react';
import './HelpTab.css';
import Help from '../components/Help';


const HelpTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="header-toolbar">
      <IonImg className="loggan-help" src="assets/icon/logga3.png"> </IonImg>
      </IonToolbar>
      </IonHeader>
        <Help/>     
    </IonPage>
  );
};

export default HelpTab;