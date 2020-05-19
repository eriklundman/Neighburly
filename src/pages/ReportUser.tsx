import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonText,
  IonRadio,
  IonRadioGroup,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonButtons,
  IonContent,
  IonLabel,
  IonItem,
  IonButton,
  IonList,
  IonAlert,
  IonIcon,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import * as firebase from "firebase";
import { toast } from "../toast";
import { chevronBackOutline } from "ionicons/icons";
import { reportUserFunc } from "../firebaseConfig";
import "./ReportUser.css";

const ReportUser: React.FC = (props) => {
  let userRef: any = firebase.auth().currentUser;
  const history = useHistory();

  const location: any = useLocation();

  const [reportedUser, setReportedUser] = useState("");
  const [incident, setIncident] = useState("");
  const [why, setWhy] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selected, setSelected] = useState<string>("Innapropriate_content");

  const confirm = () => {
    if (incident.trim() === "") {
      toast("OBS: Explain the incident!");
    } else if (why.trim() === "") {
      toast("OBS: Explain why the incident is inappropriate!");
    } else {
      setShowAlert(true);
    }
  };
  useEffect(() => {
    if (location) {
      const request: any = location.state.req;
      if (request.h_id) {
        if (userRef && userRef.uid === request.r_id) {
          setReportedUser(request.h_fn + " " + request.h_ln);
        } else if (userRef && userRef.uid === request.h_id) {
          setReportedUser(request.r_fn + " " + request.r_ln);
        }
      } else {
        setReportedUser(request.r_fn + " " + request.r_ln);
      }
    }
  }, []);

  const report = () => {
    if (location) {
      const request: any = location.state.req;
      if (request.h_id) {
        if (userRef && userRef.uid === request.r_id) {
          reportUserFunc(request.h_id, incident, why, request.req_id, selected);
        } else if (userRef && userRef.uid === request.h_id) {
          reportUserFunc(request.r_id, incident, why, request.req_id, selected);
        }
      } else {
        reportUserFunc(request.r_id, incident, why, request.req_id, selected);
      }
      toast("User reported to the Neighburly administration")
      history.push("/mapTab");
    }
  };

  const goBackNow = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={goBackNow}>
              <IonIcon icon={chevronBackOutline} color="tertiary" />
            </IonButton>
          </IonButtons>

          <IonTitle className="ion-text-center" color="tertiary">
            Report {reportedUser}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
          <IonText>
            <h4> What is the reason behind the report? </h4>
          </IonText>

            <IonItem lines="none">
          <IonRadio slot="start" className="radio-design" value="Innapropriate_content" />
          <IonLabel color="tertiary">Innapropriate content</IonLabel>
          </IonItem>
          <IonItem lines="none">
          <IonRadio slot="start" className="radio-design" value="Spam/Marketing" />
          <IonLabel color="tertiary"> Spam/Marketing</IonLabel>
          </IonItem>
          <IonItem lines="none">
          <IonRadio slot="start" className="radio-design" value="Harassment" />
          <IonLabel color="tertiary">Harassment</IonLabel>
          </IonItem>
        </IonRadioGroup>
        <IonList>
          <h4> What did {reportedUser} do?</h4>
          <IonLabel>
            In the field below you describe what the user did
            that you perceived as inappropriate.
          </IonLabel>
          <IonItem lines="none">

              <textarea
              rows={3}
                value={incident}
                className="report-input-field"
                placeholder="Explain the incident here..."
                onChange={(e: any) => setIncident(e.target.value)}
              />

          </IonItem>
          <h4> Why was it wrong?</h4>
          <IonLabel>
            Here you describe why you thought the incident(s) were
            inappropriate.
          </IonLabel>
          <IonItem lines="none">
              <textarea
              rows={3}
                value={why}
                className="report-input-field"
                placeholder="Explain why here..."
                onChange={(e: any) => setWhy(e.target.value)}
              />
          </IonItem>
        </IonList>

        <IonButton
          fill="clear"
          className="report-button"
          expand="full"
          onClick={confirm}
        >
          Report {reportedUser}
        </IonButton>

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
      </IonContent>
    </IonPage>
  );
};

export default ReportUser;
