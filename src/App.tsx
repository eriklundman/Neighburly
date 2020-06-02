import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSpinner
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/react/css/structure.css';
import Tabs from './pages/Tabs';
import Login from './pages/Login';
import Register from './pages/Register';
import TermsOfUseRegister from './pages/TermsOfUseRegister';
import Chat from "./pages/Chat";


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
import { getCurrentUser, logoutUser } from './firebaseConfig';
import AdminPage from './pages/AdminPage';
import BlockedPage from './pages/BlockedPage';
import ForgotPassword from './pages/ForgotPasswordPage';





const RoutingSystem: React.FC = () => {

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/tabs" component={Tabs}/>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/termsofuse" component={TermsOfUseRegister} exact />
        <Route path="/chat/:id" component={Chat} exact />
        <Route path="/adminpage" component={AdminPage} exact />
        <Route path="/blockedpage" component={BlockedPage} exact />
        <Route path="/forgotpassword" component={ForgotPassword} exact />
        <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

const App: React.FC = () => {

  const [busy, setBusy] = useState(true)

  useEffect(() => {
    

    getCurrentUser().then((user: any) => {
      if (user /*&& user.emailVerified*/) {       
          window.history.replaceState({}, '', '/tabs')
          //toast("Log in successful!", 1500);
      }
      else if (user && user.email === "admin@neighburly.se") {
        console.log("hej")
        window.history.replaceState({}, '', '/tabs')
        
      }
      else {
        window.history.replaceState({}, '', '/')
        /*if(user && !user.emailVerified){
          logoutUser()
          toast("Email not verified")
        }*/
      }
      setBusy(false)
    })


  }, [])

  return (
    <IonApp>
      {busy ? <IonSpinner /> : <RoutingSystem />}
    </IonApp>
  )
}

export default App;
