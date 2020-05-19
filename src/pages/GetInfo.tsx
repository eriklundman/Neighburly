import React from 'react';
import { IonSlides, IonSlide, IonPage, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonHeader, IonImg } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import './GetInfo.css';
import {Link} from 'react-router-dom';



const slideOpts = {
    initialSlide: 0,
    speed: 400,
    zoom:true,
  };

const GetInfo: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
             <IonToolbar color="primary">
             <IonTitle className="ion-text-center" color="tertiary">Info</IonTitle>
                  <IonButtons slot="start">
                 <IonBackButton text="" icon={chevronBackOutline} color="tertiary" defaultHref="/menuTab" />
              </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding" fullscreen={true}>
        <IonSlides className="bullet-design" pager={true} options={slideOpts}>
      <IonSlide>
        <div className="grid">
          <div>
        <h2>Welcome to Neighburly!</h2>
        </div>
        <div>
        <IonImg src="assets/icon/logga3.png"/>
        </div>
        <div>
        <p style={{fontWeight:"bold"}}>In the following slides you will get a tutorial on how to get started with the Neighburly app</p>
        </div>
        </div>

      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>The map!</h2>
        </div>
        <div className="design-image">
        <IonImg src="assets/icon/infoMap.png"/>
        </div>
        <div>
        <p>On the map you can see <b className="text-success">others requests</b>, help people by clicking on them and make <b className="text-warning">your own request</b> by clicking on the <b className="text-danger">"add request"</b> button.</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Make a help request!</h2>
        </div>
        <div>
        <IonImg src="assets/icon/logga3.png"/>
        </div>
        <div>
        <p>After klicking the "add request" button you get to fill out a form with all the relevant information. When you are done your request will pop up on the map on your chosen location.</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Help someone!</h2>
        </div>
        <div>
        <IonImg src="assets/icon/logga3.png"/>
        </div>
        <div>
        <p>When you want to help someone you click on the request icons on the map. You can also see a list with all requests within your set radius.</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Change your radius!</h2>
        </div>
        <div>
        <IonImg src="assets/icon/logga3.png"/>
        </div>
        <div>
        <p>If you go to Profile --> Edit your profile you will be able to change your radius.</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>If you forget!</h2>
        </div>
        <div>
        <IonImg src="assets/icon/logga3.png"/>
        </div>
        <div>
        <p>You will always be able to read this information in the menu under the "info" section</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Get started!</h2>
        </div>
        <div>
        <IonImg src="assets/icon/logga3.png"/>
        </div>
        <div>
        <Link className="link-color" to="/mapTab">Continue to Neighburly!</Link>
        </div>
        </div>
      </IonSlide>
    </IonSlides>
        </IonContent>
        </IonPage>
    );
};

export default GetInfo