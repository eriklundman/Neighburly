import React, { useState, useEffect } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonButton,
  IonTabs,
  IonInput,
  IonHeader, IonPage, IonTitle, IonToolbar, IonContent
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

const Login: React.FC = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function loginUser() {
    console.log(username, password)
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
          placeholder="username"
          onIonChange={(e: any) => setUsername(e.target.value)} />
        <IonInput
          placeholder="password"
          onIonChange={(e: any) => setPassword(e.target.value)} />
        <IonButton onClick={loginUser} >Login</IonButton>

        <p>New here? <Link to="/register">Register</Link> </p>
      </IonContent>
    </IonPage >


  );
};

export default Login;
