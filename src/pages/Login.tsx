import React, { useState, useEffect } from 'react';
import { Redirect, Route, Link, useHistory } from 'react-router-dom';
import {
  IonButton,
  IonInput,
  IonHeader, IonPage, IonText, IonToolbar, IonContent, IonLoading, IonCol, IonGrid, IonRow
} from '@ionic/react';
import HeaderLogga from '../components/HeaderLogga'
import { loginUser } from '../firebaseConfig'
import {toast} from "../toast";
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
      history.replace('/tabs');
      toast("Log in successful!", 1500);
    }
    setBusy(false)

  }


  return (

    <IonPage>
      <IonHeader>
         <IonToolbar>
             <HeaderLogga/>
          </IonToolbar>
         </IonHeader>

      <IonLoading message="Please wait..." duration={0} isOpen={busy} />

      <IonContent>
        <IonGrid>
        <IonRow>
        <IonText
         className="Register">Email address</IonText></IonRow>
        <IonRow>
        <IonInput
        className="Input"
          placeholder=""
          onIonChange={(e: any) => setEmail(e.target.value)} /></IonRow>
          <IonRow>
        <IonText
          className="Register">Password</IonText></IonRow>
          <IonRow>
        <IonInput
        className="Input"
          type="password"
          placeholder=""
          onIonChange={(e: any) => setPassword(e.target.value)} /></IonRow>
          <IonRow></IonRow>
        <IonRow>
        <IonButton text-color="tertiary"className="ion-text-capitalize" expand="full" onClick={login}>Login</IonButton>
        </IonRow>
        <IonRow>
        <div className="ion-text-center">New on Neighburly?<Link to="/register">Register here!</Link> </div>
        </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>

  );
};

export default Login;
