import React, { useEffect, useState } from "react";
import {

    IonCardContent,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonButton,
    IonButtons,
    IonAlert,
    IonItem,
    IonIcon,

} from "@ionic/react";

import './ReportsAdmin.css'
import * as firebase from "firebase";
import { blockUser, unBlockUser, deleteReport } from "../firebaseConfig";
import { closeOutline } from "ionicons/icons";



const db = firebase.firestore();


const ReportsAdmin: React.FC<any> = (props) => {


    const [rep_name, setRep_name] = useState("")
    const [why, setWhy] = useState("")
    const [incident, setIncident] = useState("")
    const [blocked, setBlocked] = useState(false)

    const [showAlert1, setShowAlert1] = useState(false)
    const [showAlert2, setShowAlert2] = useState(false)
    const [showAlert3, setShowAlert3] = useState(false)


    useEffect(() => {
        setIncident(props.report.incident)
        setWhy(props.report.why)
        
        db.collection("users").doc(props.report.reported_user_id).onSnapshot((snapshot: any) => {
            setRep_name(snapshot.data().firstname + " " + snapshot.data().lastname)

            

        })

        let blockRef: any = db.collection("blocked_users")
        if(blockRef){
            blockRef.doc(props.report.reported_user_id).onSnapshot((snapshot: any) => {
                if(snapshot.data()){
                setBlocked(true)
                }
            })
        }
            

    }, []);


    return (
        <IonCard>
            <IonCardHeader>
                <IonButton className="delete-report-btn" fill="clear" onClick={() => setShowAlert3(true)} >
                    <IonIcon color="tertiary" icon={closeOutline}></IonIcon>
                </IonButton>
            <IonCardSubtitle>
                Reported User
                </IonCardSubtitle>
                <IonCardTitle>
                    {rep_name}
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <div>
                <b>Incident description: </b>
                <p>{incident}</p>
                </div>
                <div className="why-div">
                <b>Why incident may be inappropriate:</b>
                <p>{why}</p>
                </div>
            
            <IonItem lines="none">
                <IonButtons slot="end">
                    {blocked === true ?
                    (<IonButton onClick={() => setShowAlert2(true)} color="success">

                    Unblock
                </IonButton>):
                        (<IonButton onClick={() => setShowAlert1(true)} color="danger">

                            Block
                        </IonButton>) 

                        
                    }
                </IonButtons>
                </IonItem>
                
                <IonAlert
                    isOpen={showAlert1}
                    onDidDismiss={() => setShowAlert1(false)}
                    header={"Block Reported User"}
                    message={"Are you sure you want to block this user from using the app?"}
                    buttons={[{ text: 'Cancel', cssClass: 'alert-buttons' },
                    {
                        text: 'Block User',
                        cssClass: 'alert-buttons',
                        handler: () => {
                            blockUser(props.report.reported_user_id);
                        }
                    }]}
                />
                <IonAlert
                    isOpen={showAlert2}
                    onDidDismiss={() => setShowAlert2(false)}
                    header={"Unblock User"}
                    message={"Are you sure you want to unblock this user?"}
                    buttons={[{ text: 'Cancel', cssClass: 'alert-buttons' },
                    {
                        text: 'Unblock User',
                        cssClass: 'alert-buttons',
                        handler: () => {
                            unBlockUser(props.report.reported_user_id);
                        }
                    }]}
                />
                <IonAlert
                    isOpen={showAlert3}
                    onDidDismiss={() => setShowAlert3(false)}
                    header={"Delete Report"}
                    message={"Are you sure you want to delete this report?"}
                    buttons={[{ text: 'Cancel', cssClass: 'alert-buttons' },
                    {
                        text: 'Delete Report',
                        cssClass: 'alert-buttons',
                        handler: () => {
                            deleteReport(props.report.report_id);
                        }
                    }]}
                />
            </IonCardContent>

        </IonCard>
    );
};

export default ReportsAdmin