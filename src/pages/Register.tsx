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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  function registerUser() {
    console.log(email, password, cpassword)
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
          placeholder="email"
          onIonChange={(e: any) => setEmail(e.target.value)} />

        <IonInput
          type="password"
          placeholder="password"
          onIonChange={(e: any) => setPassword(e.target.value)} />
        <IonInput
          type="password"
          placeholder="confirm password"
          onIonChange={(e: any) => setCPassword(e.target.value)} />

        <IonButton onClick={registerUser}>Register</IonButton>

        <p>Already have an account? <Link to="/login">Login</Link> </p>

      </IonContent>
    </IonPage >
  );
};

export default Register;
