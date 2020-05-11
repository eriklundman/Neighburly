import React from 'react';
import { IonSlides, IonButton, IonSlide, IonPage, IonIcon, IonToolbar, IonCol, IonTitle, IonButtons, IonBackButton, IonContent, IonHeader, IonRow, IonGrid } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import './GetInfo.css';
import {Link} from 'react-router-dom';



const slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true, 
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
        <div className="slide-design">
        <h2 >Welcome to Neighburly!</h2>
        <img className="design-img" src="assets/icon/logga3.png"/>
        <p className="text-under-img-design">Här är info om appen Här är info om appen Här är info om appen</p>
        </div>
      </IonSlide>
      <IonSlide>
        <div className="slide-design">
        <h2>How to get help</h2>
        <p className="text-design">To add a request...</p>
        </div>
      </IonSlide>
      <IonSlide>
        <div className="slide-design">
        <h2 >How to help someone</h2>
        <p className="text-design">Här är info om appen Här är info om appen Här är info om appen</p>
        </div>
      </IonSlide>
      <IonSlide>
        <div className="slide-design">
        <h2 >Chat</h2>
        <p className="text-design">Här är info om appen Här är info om appen Här är info om appen</p>
        </div>
      </IonSlide>
      <IonSlide>
        <div className="slide-design">
        <h2 >When you have completed a request</h2>
        <p className="text-design">Här är info om appen Här är info om appen Här är info om appen</p>
        </div>
      </IonSlide>
      <IonSlide>
        <div className="slide-design">
        <h2 >Ready to start Neighburly?</h2>
        <p className="text-design"><Link className="link-color" to="/mapTab">Continue to Neighburly!</Link> </p>
        </div>
      </IonSlide>
    </IonSlides>
        </IonContent>
        </IonPage>
    );
};

export default GetInfo