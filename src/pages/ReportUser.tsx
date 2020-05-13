import React, { useState, useEffect } from 'react';
import { IonPage, IonText, IonCol, IonRadio, IonRadioGroup, IonToolbar, IonGrid, IonTitle, IonHeader, IonButtons, IonBackButton, IonContent, IonLabel, IonItem, IonButton, IonRow, IonList, IonInput, IonAlert, IonIcon } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from 'firebase'
import { toast } from '../toast';
import { chevronBackOutline } from 'ionicons/icons';
import { reportUserFunc } from "../firebaseConfig";
import "./ReportUser.css";



const ReportUser: React.FC = (props) => {
    const db = firebase.firestore();
    let userRef: any = firebase.auth().currentUser;
    const history = useHistory();

    const location: any = useLocation();

    const [reportedUser, setReportedUser] = useState('')
    const [incident, setIncident] = useState('')
    const [why, setWhy] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [selected, setSelected] = useState<string>("alt1");


    const confirm = () => {
        if (incident.trim() === '') {
            toast("OBS: Explain the incident!")
        }
        else if (why.trim() === '') {
            toast("OBS: Explain why the incident is inappropriate!")
        }
        else {
            setShowAlert(true)
        }
    }
    useEffect(() => {
        if (location) {
            const request: any = location.state.req;
            if (request.h_id) {
                if (userRef && userRef.uid === request.r_id) {
                    setReportedUser(request.h_fn + " " + request.h_ln)
                }
                else if (userRef && userRef.uid === request.h_id) {
                    setReportedUser(request.r_fn + " " + request.r_ln)
                }
            }
            else {
                setReportedUser(request.r_fn + " " + request.r_ln)
            }
        }
    }, []);

    const report = () => {

        if (location) {
            const request: any = location.state.req;
            if (request.h_id) {
                if (userRef && userRef.uid === request.r_id) {
                    reportUserFunc(request.h_id, incident, why, request.req_id)

                }
                else if (userRef && userRef.uid === request.h_id) {
                    reportUserFunc(request.r_id, incident, why, request.req_id)

                }
            }
            else {
                reportUserFunc(request.r_id, incident, why, request.req_id)
            }

            history.push("/mapTab")
        }

    }

    const goBackNow = () => {
        history.goBack()
    }



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonButton onClick={goBackNow} >
                            <IonIcon icon={chevronBackOutline} color="tertiary" />
                        </IonButton>
                    </IonButtons>

                    <IonTitle className="ion-text-center" color="tertiary">Report {reportedUser}</IonTitle>

                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                <IonRadioGroup>
            
              <IonRow className="ion-justify-content-center">
            <IonText> <h4> Pick a category of the report </h4></IonText></IonRow>
            <IonRow className="hallo">
                   <IonCol className="ion-justify-content-center">
                   <IonRadio className="radio-design" value="alt1" />
                <IonLabel color="tertiary"> alt 1</IonLabel></IonCol></IonRow>
                <IonCol></IonCol>
               <IonRow className="hallo">
                   <IonCol className="ion-justify-content-center">
                   <IonRadio className="radio-design" value="alt2" />
                <IonLabel color="tertiary"> alt 2</IonLabel></IonCol></IonRow>
                <IonCol></IonCol>
                <IonRow>
                   <IonCol className="ion-justify-content-center">
                   <IonRadio className="radio-design" value="alt3" />
                <IonLabel color="tertiary"> alt 3</IonLabel></IonCol></IonRow>
                <IonCol></IonCol>
                </IonRadioGroup>
                <IonList>
                        <IonLabel className="text-design"> What have the user you want to report done?
                        In this field you describe what the user have
                        written or done that may have been inappropriate.
                        </IonLabel>
                        <IonItem>
                            <div className="information-div">
                            <textarea className="address-input-field"
                                     placeholder="Explain the incident here..."

                                onChange={(e: any) => setIncident(e.target.value)} />
                        </div></IonItem>
                        <IonLabel className="text-design"> Why was the behaviour not suitable for this app?
                        Here you describe why the incident should be considered
                        inappropriate.
                        </IonLabel>
                        <IonItem>
                        <div className="information-div">
                            <textarea className="address-input-field"
                                     placeholder="Explain why here..."
                                onChange={(e: any) => setWhy(e.target.value)} />
                       </div></IonItem>

                    </IonList>
                    <IonRow>
                        <IonButton fill="clear"className="report-button" expand="full" onClick={confirm}>Report the User</IonButton>
                    </IonRow>
                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        header={"Are you sure you want to send in report?"}
                        buttons={[
                            { text: "Cancel", cssClass: "alert-buttons" },
                            {
                                cssClass: "alert-buttons",
                                text: "Yes",
                                handler: () => {
                                    report();
                                },
                            },
                        ]}
                    />
                </IonGrid>
            </IonContent>
        </IonPage>

    );


};

export default ReportUser