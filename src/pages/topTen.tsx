import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonContent, IonToolbar, IonTitle, IonButtons, IonBackButton, IonItem, IonLabel, useIonViewDidEnter, IonBadge, IonList } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import * as firebase from "firebase";
import './topTen.css'

const db = firebase.firestore();

const TopTen: React.FC = () => { 

    const [info, setInfo] = useState([])
    
useIonViewDidEnter(() => {
    let reqArr: any = [];
    let userRef = db.collection("users").orderBy("score", "desc").limit(10);

    if(userRef){
    userRef.get().then((result:any) => {
      reqArr = [];
      result.forEach((user:any) => {
        reqArr.push({
          score: user.data().score,
          rating: user.data().rating,
          fn: user.data().firstname,
          ln: user.data().lastname,
        });
      });
      loadData(reqArr);
    });
}
      }, []);

      function loadData(data: any) {
        setInfo(data);
        console.log(data)
      }
    
return (
    <IonPage>
        <IonHeader>
            <IonToolbar color="primary">
            <IonTitle color="tertiary">Top 10</IonTitle>
          <IonButtons slot="start">
          <IonBackButton text="" icon={chevronBackOutline} color="tertiary" defaultHref="/menuTab" />
        </IonButtons>

            </IonToolbar>

        </IonHeader>
        <IonContent>
        {info && info.map((item: any, index: number) => 
            <IonList> 
                {index === 0 ?
                <IonItem> 
                <IonLabel className="best-score">{index + 1 +". " + item.fn + " " + item.ln[0]}</IonLabel>
                <IonBadge slot="end" color="success">{Math.round(item.score)}</IonBadge>
                </IonItem> 
                :
                <IonItem> 
                <IonLabel>{index + 1 +". " + item.fn + " " + item.ln[0]}</IonLabel>
                <IonBadge slot="end">{Math.round(item.score)}</IonBadge>
                </IonItem> 
            }
            </IonList>           
        )}

        </IonContent>
    </IonPage>
);
};

export default TopTen;