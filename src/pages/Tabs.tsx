import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { personOutline, navigateCircleOutline, heartOutline, menuOutline } from 'ionicons/icons';
import MenuTab from './MenuTab';
import HelpTab from './HelpTab';
import MapTab from './MapTab';
import ProfileTab from './ProfileTab';
import MakeRequest from './MakeRequest';
import EditYourProfile from './EditYourProfile';
import GetInfo from './GetInfo';
import TermsOfUse from './TermsOfUse';




const Tabs: React.FC = () => {
  return (

    <IonTabs>
      <IonRouterOutlet>
        <Route path="/menuTab" component={MenuTab} exact={true} />
        <Route path="/menuTab/info/" component={GetInfo}/>
        <Route path="/menuTab/termsandconditions/" component={TermsOfUse}/>
        <Route path="/helpTab" component={HelpTab} exact={true} />
        <Route path="/mapTab" component={MapTab} exact={true} />
        <Route path="/mapTab/makerequest/" component={MakeRequest}/>
        <Route path="/profileTab" component={ProfileTab} />
        <Route path="/profileTab/edityourprofile/" component={EditYourProfile}/>
        <Route path="/tabs" render={() => <Redirect to="/mapTab" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" >
        <IonTabButton tab="menuTab" href="/menuTab">
          <IonIcon color="secondary" icon={menuOutline} />
          <IonLabel color="secondary">Menu</IonLabel>
        </IonTabButton>
        <IonTabButton tab="helpTab" href="/helpTab">
          <IonIcon color="secondary" icon={heartOutline} />
          <IonLabel color="secondary">Helps</IonLabel>
        </IonTabButton>
        <IonTabButton tab="mapTab" href="/mapTab">
          <IonIcon color="secondary" icon={navigateCircleOutline} />
          <IonLabel color="secondary">Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profileTab" href="/profileTab">
          <IonIcon color="secondary" icon={personOutline} />
          <IonLabel color="secondary">My Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs;
