import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSpinner
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tabs from './pages/Tabs';
import Login from './pages/Login';
import Register from './pages/Register';
import TermsOfUseRegister from './pages/TermsOfUseRegister';
import Chat from "./pages/Chat";
import * as firebase from 'firebase'



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
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './firebaseConfig';
import AdminPage from './pages/AdminPage';
import BlockedPage from './pages/BlockedPage';





const RoutingSystem: React.FC = () => {

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/tabs" component={Tabs} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/termsofuse" component={TermsOfUseRegister} exact />
        <Route path="/chat/:id" component={Chat} exact />
        <Route path="/adminpage" component={AdminPage} exact />
        <Route path="/blockedpage" component={BlockedPage} exact />
        <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}





const App: React.FC = () => {

  const [busy, setBusy] = useState(true)

  useEffect(() => {
    getCurrentUser().then((user: any) => {
      if (user) { 
        /*console.log("inloggad")
        //logged in

        
        let blockRef: any = firebase.firestore().collection("blocked_users")

        if (blockRef) {
          blockRef.onSnapshot((snapshot: any) => {
            console.log("innanför onSnapshot")
            snapshot.forEach((blocked_user: any) => {
              console.log("innanför forEach")
              if (user.uid === blocked_user.id) {
                console.log("inloggad som blockad")
                window.history.replaceState({}, '', '/blockedpage')
              }
              console.log("utanför if-sats")
            })
            console.log("utanför onSnapshot")
          })
          console.log("utanför forEach")
        }
        else if (user.email === "admin@neighburly.se") {
          console.log("inloggad som admin")
          window.history.replaceState({}, '', '/adminpage')
        }
        else {
          console.log("inloggad på riktigt")*/
          window.history.replaceState({}, '', '/tabs')
        //}

      }
      else {
        console.log("inte inloggad")
        window.history.replaceState({}, '', '/')
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
