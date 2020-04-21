import React, { useState, useEffect } from 'react';
import { Redirect, Route, Link, useHistory } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonButton,
  IonTabs,
  IonInput,
  IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonLoading
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { registerUser } from '../firebaseConfig'
import { toast } from "../toast";

const Register: React.FC = () => {
  let history = useHistory();
  const [busy, setBusy] = useState<boolean>(false);

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  async function register() {

    if (password !== cpassword) {
      console.log("olika lösenord")
      return toast("Passwords doesn't match")
    }
    if (email.trim() === "" || password.trim() === "") {
      return toast("Email and password are required")
    }
    if (firstname.trim() === "" || lastname.trim() === "") {
      return toast("First name and surname are required")
    }
    setBusy(true);
    const res = await registerUser(firstname, lastname, email, password);
    console.log(res);
    if (res) {
      history.push('/login');
      await toast("You're account has been registered!", 3000);
    }
    setBusy(false);
  }

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
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
