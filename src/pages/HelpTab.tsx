import React from 'react';
import { IonContent, IonPage} from '@ionic/react';
import './HelpTab.css';
import Help from '../components/Help';
import HeaderLogga from '../components/HeaderLogga';


const HelpTab: React.FC = () => {
  return (
    <IonPage>
      <HeaderLogga/>
        <Help/>     
    </IonPage>
  );
};

export default HelpTab;