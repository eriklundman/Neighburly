import React, { useState, useEffect } from 'react';
import { Redirect, Route, Link, useHistory } from 'react-router-dom';
import {
  IonButton,
  IonInput,
  IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonLoading
} from '@ionic/react';
import HeaderLogga from '../components/HeaderLogga'
import { loginUser } from '../firebaseConfig'
import {toast} from "../toast";

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
        <IonInput
          placeholder="email"
          onIonChange={(e: any) => setEmail(e.target.value)} />
        <IonInput
          type="password"
          placeholder="password"
          onIonChange={(e: any) => setPassword(e.target.value)} />
        <IonButton onClick={login}>Login</IonButton>
        <p>New here? <Link to="/register">Register</Link> </p>
      </IonContent>
    </IonPage >

  );
};

export default Login;
