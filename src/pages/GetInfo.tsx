import React from 'react';
import { IonSlides, IonSlide, IonPage, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, IonHeader, IonImg } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import './GetInfo.css';
import {Link} from 'react-router-dom';



const slideOpts = {
    initialSlide: 0,
    speed: 400,
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
        <p>In the following slides you will get a tutorial on how to get started with the Neighburly app</p>
        </div>
        </div>

      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Welcome to Neighburly!</h2>
        </div>
        <div>
        <IonImg src="assets/icon/logga3.png"/>
        </div>
        <div>
        <p>In the following slides you will get a tutorial on how to get started with the Neighburly app</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Welcome to Neighburly!</h2>
        </div>
        <div>
        <IonImg src="assets/icon/logga3.png"/>
        </div>
        <div>
        <p>In the following slides you will get a tutorial on how to get started with the Neighburly app</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Welcome to Neighburly!</h2>
        </div>
        <div>
        <IonImg src="assets/icon/logga3.png"/>
        </div>
        <div>
        <p>In the following slides you will get a tutorial on how to get started with the Neighburly app</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Welcome to Neighburly!</h2>
        </div>
        <div>
        <IonImg src="assets/icon/logga3.png"/>
        </div>
        <div>
        <p>In the following slides you will get a tutorial on how to get started with the Neighburly app</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Welcome to Neighburly!</h2>
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