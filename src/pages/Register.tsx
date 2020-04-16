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
import { registerUser } from '../firebaseConfig'

const Register: React.FC = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  async function register() {
    if (password === cpassword) {
      const res = await registerUser(firstname, lastname, email, password)
    }
    else {
      console.log("olika lösenord")
    }
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
          placeholder="first name"
          onIonChange={(e: any) => setFirstname(e.target.value)} />
        <IonInput
          placeholder="last name"
          onIonChange={(e: any) => setLastname(e.target.value)} />
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

        <IonButton onClick={register}>Register</IonButton>

        <p>Already have an account? <Link to="/login">Login</Link> </p>

      </IonContent>
    </IonPage >
  );
};

export default Register;
