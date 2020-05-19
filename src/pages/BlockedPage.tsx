import React, {useState, useEffect } from 'react';
import { IonPage, IonImg, IonToolbar, IonGrid, IonTitle, IonHeader, IonButtons, IonBackButton, IonContent, IonLabel, IonItem, IonButton, IonRow, IonList, IonInput, IonFooter } from '@ionic/react';
import { logoutUser } from '../firebaseConfig';
import "./BlockedPage.css";
import * as firebase from "firebase";
const db = firebase.firestore();

    const BlockedPage: React.FC = () => {

        const [blockType, setBlockType] = useState("")

    useEffect(() => {

        let userRef = firebase.auth().currentUser
        let repRef = db.collection("reports")
        
        if (repRef) {
            repRef.onSnapshot((snapshot: any) => {
              snapshot.forEach((report: any)=>{
                if (userRef && userRef.uid === report.data().reported_user_id) {
                 if(report.data().type === "Innapropriate_content"){
                    setBlockType("Inappropriate Content")
                 }
                 else if(report.data().type === "Spam/Marketing"){
                     setBlockType("Spam or Marketing")
                 }
                 else{
                     setBlockType(report.data().type)
                 }
                  
                }
              })
            })
          }

    },[])
    




    return (
        <IonPage>
            <IonHeader>
        <IonToolbar class="header-toolbar">
          <IonImg className="loggan-block" src="assets/icon/logga3.png">
          </IonImg>
        </IonToolbar>
      </IonHeader>
            <IonContent className="ion-padding">
                    <div className="blocked-grid">
                        <h2 className="text-danger">You have been blocked</h2>
                        <div>
                  <p>You are blocked from using Neighburly. An user has reported that you have broken the rules regarding: </p>
                  </div>
                  <h4> <b className="text-danger">{blockType}</b>
                  </h4>
                  <div className="bottom-text">
                  <p>If you want more information about the report, or believe that the report is not correct, please contact the Neighburly team at <b>neighburly@website.com.</b> </p>
                  </div>
    </div> </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButtons>
                        <IonButton color="danger" onClick={() => {
                            logoutUser()
                            window.location.reload();
                        }}>
                            Log Out
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonFooter>
        </IonPage>

    );


};

export default BlockedPage