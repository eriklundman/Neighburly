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
import { ellipse, square, triangle, personOutline, navigateCircleOutline, heartOutline, menuOutline } from 'ionicons/icons';
import MenuTab from './pages/MenuTab';
import HelpTab from './pages/HelpTab';
import MapTab from './pages/MapTab';
import ProfileTab from './pages/ProfileTab';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
        <Route path="/menuTab" component={MenuTab} exact={true} />
          <Route path="/helpTab" component={HelpTab} exact={true} />
          <Route path="/mapTab" component={MapTab} exact={true} />
          <Route path="/profileTab" component={ProfileTab} />
          <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
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
    </IonReactRouter>
  </IonApp>
);

export default App;
