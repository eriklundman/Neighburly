import React from 'react';
import './HeaderLogga.css';
import { IonHeader, IonImg } from '@ionic/react';

const HeaderLogga = () => {
    return(
        <IonHeader className="header_logga" color="primary">
        <IonImg src="assets/icon/logga.png" className="loggan"> </IonImg>
          </IonHeader>
       
    );
  };

  export default HeaderLogga;





