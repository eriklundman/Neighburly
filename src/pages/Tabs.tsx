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





const Tabs: React.FC = () => {
  const [newMessage, setNewMessage] = useState(false);
  useEffect(() => {
    setNewMessage(true)
  });


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
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton className="tabColor" tab="profileTab" href="/profileTab">
          <IonIcon icon={personOutline} />
          <IonLabel>My Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs;
