import React, { useState } from 'react';
import { IonPage, IonToolbar, IonTitle, IonHeader, IonButtons, IonBackButton, IonContent, IonLabel, IonItem, IonIcon, IonButton, IonItemGroup, IonRow, IonCol } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import EditRadius from '../components/EditRadius'
import EditInfo from '../components/EditInfo';
import HeaderLogga from '../components/HeaderLogga';



const EditYourProfile: React.FC = () => {
    const [radius, setRadius] = useState();

    return (
        <IonPage>
             <IonHeader>
              <IonToolbar>
                 <HeaderLogga/>
              </IonToolbar>
             </IonHeader>

        <IonContent>

        <IonItem> 
        <IonButtons slot="start">
          <IonBackButton text="" color="tertiary" defaultHref="/profileTab" />
        </IonButtons>
        <IonTitle color="tertiary"> Edit profile </IonTitle>
        <IonIcon color="tertiary" icon={settingsOutline} slot="start"/>
      </IonItem>
      
      <EditRadius radius={radius} setRadius={setRadius} />
      <EditInfo/>
     
      <IonRow>
          
      <IonButtons>
          <IonButton expand="full" className="ion-text-capitalize" color="secondary">Change password</IonButton>
          </IonButtons>
          </IonRow>
          <IonRow>
          <IonButton expand="full" color="danger">Delete account</IonButton>
          
          </IonRow>
          <IonRow>
              <IonButton expand="block" >Save changes</IonButton>
          </IonRow>
         </IonContent>
        </IonPage>
    );
};

export default EditYourProfile