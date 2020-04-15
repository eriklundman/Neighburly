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

const Register: React.FC = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  function registerUser() {
    console.log(username, password, cpassword )
  }

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput
          placeholder="username"
          onIonChange={(e: any) => setUsername(e.target.value)} />

        <IonInput
          placeholder="password"
          onIonChange={(e: any) => setPassword(e.target.value)} />
        <IonInput
          placeholder="confirm password"
          onIonChange={(e: any) => setCPassword(e.target.value)} />

        <IonButton onClick={registerUser}>Register</IonButton>

        <p>Already have an account? <Link to="/login">Login</Link> </p>

      </IonContent>
    </IonPage >
  );
};

export default Register;
