import React, { useState} from "react";
import {
  IonIcon,
  useIonViewDidEnter,
} from "@ionic/react";
import { getUserInfo } from "../firebaseConfig";

import { personCircleOutline} from "ionicons/icons";
import "./Profile.css";

const Profile: React.FC = () => {
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [email, setEmail] = useState("");

  useIonViewDidEnter(() => {
    getUserInfo().then((result: any) => {
      if (result !== undefined) {
        setFn(result.firstname);
        setLn(result.lastname);
        setEmail(result.email);
      }
    });
  });

  return (
    
        <div className="profile-name">
          <IonIcon
            slot="end"
            size="large"
            color="tertiary"
            icon={personCircleOutline}
          />
          <h3 color="tertiary">
            {fn} {ln}
          </h3>
        </div>
     
  );
};

export default Profile;
