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
    IonIcon,

} from "@ionic/react";

import * as firebase from "firebase";
import { useHistory } from "react-router-dom";
import { toast } from "../toast";
import { trashOutline } from "ionicons/icons";
import { blockUser } from "../firebaseConfig";



const db = firebase.firestore();


const ReportsAdmin: React.FC<any> = (props) => {


    const [rep_name, setRep_name] = useState("")
    const [why, setWhy] = useState("")
    const [incident, setIncident] = useState("")

    const [showAlert, setShowAlert] = useState(false)


    useEffect(() => {
        setIncident(props.report.incident)
        setWhy(props.report.why)
        db.collection("users").doc(props.report.reported_user_id).onSnapshot((snapshot: any) => {
            setRep_name(snapshot.data().firstname + " " + snapshot.data().lastname)
        })

    }, []);


    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Reported User: <b>{" " + rep_name}</b><br></br><br></br>

                </IonCardTitle>
                <IonCardSubtitle>
                    Incident description: <br></br>{" " + incident}<br></br><br></br>
                Why incident may be inappropriate: <br></br>{" " + why}<br></br><br></br>
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonButtons>
                    <IonButton onClick={() => setShowAlert(true)} color="danger">
                    
                Block
                    </IonButton>
                </IonButtons>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
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
            </IonCardContent>

        </IonCard>
    );
};

export default ReportsAdmin