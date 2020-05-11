import React, {useEffect, useState} from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonBadge
} from '@ionic/react';
import { personOutline, navigateCircleOutline, heartOutline, menuOutline } from 'ionicons/icons';
import MenuTab from './MenuTab';
import HelpTab from './HelpTab';
import MapTab from './MapTab';
import ProfileTab from './ProfileTab';
import MakeRequest from './MakeRequest';
import EditYourProfile from './EditYourProfile';
import GetInfo from './GetInfo';
import TermsOfUse from './TermsOfUse';
import './Tabs.css';
import * as firebase from "firebase";
import UpdatePassword from './UpdatePassword';
const db = firebase.firestore();





const Tabs: React.FC = () => {
  const [newMessage, setNewMessage] = useState(false);

  useEffect(() => {
    let boolArray: boolean[] = [];
    let userRef : any = firebase.auth().currentUser;
    db.collection("chats").where('participants', 'array-contains',
        userRef.uid)
        .onSnapshot(function (snapshot) {
          boolArray = [];
          snapshot.forEach(function (change) {
            let lastMessage = change.data().newMessage;
              console.log(lastMessage)
            if (lastMessage === userRef.uid || lastMessage === "noNew") {
                boolArray.push(false);
                setNewMessage(false)
            }
            else {
                setNewMessage(true)
                boolArray.push(true)
            }
          });
          checkBoolArray(boolArray)
        });
  }, []);

  function checkBoolArray(array : any) {
     if (array.includes(true)) {
         console.log("det finns ett nytt meddelande!")
       return setNewMessage(true);
     }
     console.log("du har inga nya meddelanden!")
     return setNewMessage(false);
  }
  return (

    <IonTabs>
      <IonRouterOutlet>
        <Route path="/menuTab" component={MenuTab} exact={true} />
        <Route path="/menuTab/info/" component={GetInfo}/>
        <Route path="/menuTab/termsandconditions/" component={TermsOfUse}/>
        <Route path="/helpTab" component={HelpTab} exact={true} />
        <Route path="/mapTab" component={MapTab} exact={true} />
        <Route path="/mapTab/makerequest/" component={MakeRequest}/>
        <Route path="/profileTab" component={ProfileTab} exact={true} />
        <Route path="/edityourprofile" component={EditYourProfile}/>
        <Route path="/updatepassword" component={UpdatePassword}/>
        <Route path="/tabs" render={() => <Redirect to="/mapTab" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton className="tabColor" tab="menuTab" href="/menuTab">
          <IonIcon icon={menuOutline} />
          <IonLabel >Menu</IonLabel>
        </IonTabButton>
        <IonTabButton className="tabColor" tab="helpTab" href="/helpTab">
          {newMessage && <IonBadge color="danger">1</IonBadge>}
          <IonIcon icon={heartOutline} />
          <IonLabel>Helps</IonLabel>
        </IonTabButton>
        <IonTabButton className="tabColor" tab="mapTab" href="/mapTab">
          <IonIcon icon={navigateCircleOutline} />
          <IonLabel>Requests</IonLabel>
        </IonTabButton>
        <IonTabButton className="tabColor" tab="profileTab" href="/profileTab">
          <IonIcon icon={personOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs;
