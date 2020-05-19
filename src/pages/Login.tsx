import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  IonButton,
  IonInput,
  IonPage, IonLabel, IonList, IonContent, IonLoading, IonGrid, IonRow, IonItem, IonHeader, IonToolbar, IonImg
} from '@ionic/react';
import { loginUser } from '../firebaseConfig'
import { toast } from "../toast";
import './Login.css';

const Login: React.FC = () => {

  const [busy, setBusy] = useState<boolean>(false)
  const history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    setBusy(true)
    const res = await loginUser(email, password)
    
    console.log(`${res ? 'login success' : 'login failed' }`)
    if (res) {
      window.location.reload();
      if(email === "admin@neighburly.se"){
        history.replace('/adminpage');
        toast("Log in as admin successful!", 1500);
      }
      else{
      history.replace('/tabs');
      toast("Log in successful!", 1500);
      }
      
    }
    setBusy(false)
  }


  return (

    <IonPage>
      <IonHeader>
        <IonToolbar className="header-toolbar-login">
      <IonImg className="loggan-login" src="assets/icon/logga3.png"> </IonImg>
      </IonToolbar>
      </IonHeader>
      <IonLoading spinner="circles" message="Please wait..." duration={0} isOpen={busy} />
      <IonContent>

          <IonList>
            <IonItem>
            <IonLabel position="floating"> Email address</IonLabel>
            <IonInput
          onIonChange={(e: any) => setEmail(e.target.value)} /></IonItem>
          <IonItem>
          <IonLabel position="floating"> Password</IonLabel>
        <IonInput
          type="password"
          onIonChange={(e: any) => setPassword(e.target.value)} /></IonItem>
        
        <IonButton text-color="tertiary" expand="block" className="login-button" onClick={login}>Login</IonButton>


        
        </IonList>
       
       <IonItem lines="none">
        <div>New on Neighburly? <Link className="link-color" to="/register">Register here!</Link> </div>
        </IonItem>
 

      </IonContent>
    </IonPage>

  );
};

export default Login;
