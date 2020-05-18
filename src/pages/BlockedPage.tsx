import React, {useState, useEffect } from 'react';
import { IonPage, IonImg, IonToolbar, IonGrid, IonTitle, IonHeader, IonButtons, IonBackButton, IonContent, IonLabel, IonItem, IonButton, IonRow, IonList, IonInput, IonFooter } from '@ionic/react';
import { logoutUser } from '../firebaseConfig';
import "./BlockedPage.css";





    const BlockedPage: React.FC = () => {
      /* här försökte jag mig på att hämta värdena via databasen, gick inte så bra:))):
    

        const BlockedPage: React.FC<any> = (props) => {

    useEffect(() => {

    let value: any;
    if (props.item.type === "Innapropriate_content") {
      value = "Innapropriate_content";
    }
    if (props.item.type === "Spam/Marketing") {
      value = "Spam/Marketing";
    }
    if (props.item.type === "Harassment") {
      value = "Harassment";
    }

    eller..
    function displayAlternative() {
    
    if (type === "Innapropriate_content") {
      setText("Innapropriate_content");
      setName(props.item.r_fn + " " + props.item.r_ln);
      
    }

    if (type === ""Spam/Marketing"") {
      setText("Spam/Marketing");
      setName(props.item.h_fn + " " + props.item.h_ln);
      setStars(h_stars);
    }
    
}*/

    


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
                        <h3>You have been blocked</h3>
                        <div>
                  <p>You are blocked from using Neighburly. An user has reported that you have broken the rules regarding: </p>
                  </div>
                  <div>lägg in här..


                  </div>
                  <div>
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