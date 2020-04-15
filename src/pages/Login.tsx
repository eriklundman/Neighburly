import React, { useState, useEffect } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonButton,
  IonInput,
  IonHeader, IonPage, IonTitle, IonToolbar, IonContent
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { loginUser } from '../firebaseConfig'

const Login: React.FC = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    const res = await loginUser(email, password)
    console.log(`${res ? 'login success' : 'login failed' }`)
  }

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
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
