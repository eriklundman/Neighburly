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
import { blockUser, unBlockUser } from "../firebaseConfig";



const db = firebase.firestore();


const ReportsAdmin: React.FC<any> = (props) => {


    const [rep_name, setRep_name] = useState("")
    const [why, setWhy] = useState("")
    const [incident, setIncident] = useState("")
    const [blocked, setBlocked] = useState(false)

    const [showAlert1, setShowAlert1] = useState(false)
    const [showAlert2, setShowAlert2] = useState(false)


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
                    {blocked === true ?
                    (<IonButton onClick={() => setShowAlert2(true)} color="success">

                    Unblock
                </IonButton>):
                        (<IonButton onClick={() => setShowAlert1(true)} color="danger">

                            Block
                        </IonButton>) 

                        
                    }
                </IonButtons>
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
            </IonCardContent>

        </IonCard>
    );
};

export default ReportsAdmin