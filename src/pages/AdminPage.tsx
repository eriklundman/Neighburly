import React, { useState, useEffect } from 'react';
import { IonPage, IonToolbar, IonGrid, IonTitle, IonHeader, IonButtons, IonContent, IonLabel, IonItem, IonButton, IonRow, IonList, IonInput, IonAlert, IonIcon, IonFooter } from '@ionic/react';
import { toast } from '../toast';
import { logoutUser } from '../firebaseConfig'
import ReportsAdmin from '../components/ReportsAdmin';
import * as firebase from 'firebase'
const db = firebase.firestore();


const AdminPage: React.FC = () => {

    const [reports, setReports] = useState([]);
    let userRef: any = firebase.auth().currentUser;

    useEffect(() => {
        let repArr: any = [];
        let reportsRef = db.collection("reports");

        if (reportsRef) {
            reportsRef.onSnapshot((snapshot: any) => {
                repArr = [];
                snapshot.forEach((report: any) => {
                    repArr.push({
                        incident: report.data().incident,
                        why: report.data().why_inappropriate,
                        reported_user_id: report.data().reported_user_id,
                        type_of_incident: report.data().type,
                        report_id: report.id
                    });
                })
                loadData(repArr);
            });
        }
    }, []);

    function loadData(data: any) {
        setReports(data);
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle className="ion-text-center" color="tertiary">Admin Page <br></br> Reports:</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonList>
                        {reports &&
                            reports.map((report: any, index: number) =>

                                <ReportsAdmin key={index} report={report} />



                            )}
                    </IonList>

                </IonGrid>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonItem detail={false} lines="none" button onClick={() => {
                            logoutUser()
                            window.location.reload();
                        }}>
                            <IonLabel color="danger">
                            Log Out
                            </IonLabel>
                    </IonItem>
                </IonToolbar>
            </IonFooter>
        </IonPage>

    );


};

export default AdminPage