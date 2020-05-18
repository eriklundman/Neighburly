import React from "react";
import {
  IonIcon,
} from "@ionic/react";
import { personCircleOutline} from "ionicons/icons";
import "./Profile.css";

const Profile: React.FC<any> = (props) => {



  return (
    
        <div className="profile-name">
          <IonIcon
            slot="end"
            size="large"
            color="tertiary"
            icon={personCircleOutline}
          />
          <h3 color="tertiary">
            {props.fn} {props.ln}
          </h3>
        </div>
     
  );
};

export default Profile;
