import React from 'react';
import { IonSlides, IonSlide, IonPage, IonIcon, IonToolbar, IonCol, IonTitle, IonButtons, IonBackButton, IonContent, IonHeader, IonRow, IonGrid } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';

const slideOpts = {
    initialSlide: 1,
    speed: 400
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
        <IonContent>

        <IonSlides pager={true} options={slideOpts}>
      <IonSlide>
        <h1>Slide 1</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 2</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 3</h1>
      </IonSlide>
    </IonSlides>
    
        </IonContent>
        </IonPage>
    );
};

export default GetInfo