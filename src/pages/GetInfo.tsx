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

        <IonContent fullscreen={true} className="ion-padding">
        <IonSlides className="bullet-design" pager={true} options={slideOpts}>
      <IonSlide>
        <div className="grid">
          <div>
        <h1>Welcome to Neighburly!</h1>
        </div>
        <div>
        <IonImg src="assets/icon/logga3.png"/>
        </div>
        <div>
        <p>
        In the following slides you will get a tutorial on how to get started with the Neighburly app.   
      </p>
        </div>
        </div>

      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>The map</h2>
        </div>
        <div className="image-container">
        <IonImg className="image-slide" src="assets/icon/infoMap.png"/>
        </div>
        <div className="text-container">
        <p>On the map you can see <b className="text-success">others requests</b>, help people by clicking on them and make <b className="text-warning">your own request</b> by clicking on the <b className="text-danger">"Add Request"</b> button.</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Make a help request</h2>
        </div>
        <div className="image-container">
        <IonImg className="image-slide" src="assets/icon/infoAdd.png"/>
        </div>
        <div className="text-container">
        <p>After clicking the "Add Request" button you get to fill out a form with all the relevant information. When you are done your request will pop up on the map on your chosen location.</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Help someone</h2>
        </div>
        <div className="image-container">
        <IonImg className="image-slide" src="assets/icon/infoHelp.png"/>
        </div>
        <div className="text-container">
        <p>When you want to help someone you click on a <b className="text-danger">request icon </b> on the map, click the<b className="text-warning"> "HELP" </b>button. You can also see a <b className="text-success">list</b> with all requests within your set radius.</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Your profile</h2>
        </div>
        <div className="image-container">
        <IonImg className="image-slide" src="assets/icon/infoProfile.png"/>
        </div>
        <div className="text-container">
        <p>In your profile you can see your <b className="text-secondary">rating</b> and <b className="text-warning">score</b>, how many people you have <b className="text-success">helped and been helped by</b>. You can also <b className="text-danger">edit your profile</b>.</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Change your radius</h2>
        </div>
        <div className="image-container">
        <IonImg className="image-slide" src="assets/icon/infoRadius.png"/>
        </div>
        <div className="text-container">
        <p>When you press the button "Edit your profile" you will be able to <b className="text-success">change your radius</b>.</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>Your requests</h2>
        </div>
        <div className="image-container">
        <IonImg className="image-slide" src="assets/icon/infoRequest.png"/>
        </div>
        <div className="text-container">
          <p>You can find your <b className="text-warning">ongoing</b> and <b className="text-danger">completed</b> requests here, this is also where you reach the <b className="text-success">chat</b>.</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h2>If you forget</h2>
        </div>
        <div className="image-container">
        <IonImg className="image-slide" src="assets/icon/infoMenu.png"/>
        </div>
        <div className="text-container">
        <p>You will always be able to read this information in the menu under the <b className="text-success">"Info"</b> section. Don't forget to check if you made it on the <b className="text-danger">top list</b>!</p>
        </div>
        </div>
      </IonSlide>
      <IonSlide>
      <div className="grid">
          <div>
        <h1>Get started!</h1>
        </div>
        <div>
        <IonImg src="assets/icon/logga3.png"/>
        </div>
        <div className="hejsan">
       <h3> <Link className="link-colors" to="/mapTab"><b>Continue to Neighburly!  </b></Link></h3>
        </div>
        </div>
      </IonSlide>
    </IonSlides>
        </IonContent>
        </IonPage>
    );
};

export default GetInfo