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


const Tabs: React.FC = () => {
  return (

    <IonTabs>
      <IonRouterOutlet>
        <Route path="/menuTab" component={MenuTab} exact={true} />
        <Route path="/helpTab" component={HelpTab} exact={true} />
        <Route path="/mapTab" component={MapTab} exact={true} />
        <Route path="/profileTab" component={ProfileTab} />
        <Route path="/tabs" render={() => <Redirect to="/mapTab" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" >
        <IonTabButton tab="menuTab" href="/menuTab">
          <IonIcon icon={menuOutline} />
          <IonLabel>Menu</IonLabel>
        </IonTabButton>
        <IonTabButton tab="helpTab" href="/helpTab">
          <IonIcon icon={heartOutline} />
          <IonLabel>Helps</IonLabel>
        </IonTabButton>
        <IonTabButton tab="mapTab" href="/mapTab">
          <IonIcon icon={navigateCircleOutline} />
          <IonLabel>Map</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profileTab" href="/profileTab">
          <IonIcon icon={personOutline} />
          <IonLabel>My Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs;
