import React, { useState, useEffect } from 'react';
import { Redirect, Route, Link, useHistory } from 'react-router-dom';
import {
  IonLabel,
  IonButton,
  IonInput,
  IonHeader, 
  IonPage,
  IonToolbar, 
  IonContent, 
  IonLoading,
  IonList,
  IonItem,
  IonCheckbox
} from '@ionic/react';
import { registerUser } from '../firebaseConfig'
import { toast } from "../toast";
import HeaderLogga from '../components/HeaderLogga';


const Register: React.FC = () => {
  let history = useHistory();
  const [busy, setBusy] = useState<boolean>(false);

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  const [checked, setChecked] = useState(false);

  async function register() {

    if (password !== cpassword) {
      return toast("Passwords doesn't match")
    }
    if (email.trim() === "" || password.trim() === "") {
      return toast("Email and password are required")
    }
    if (firstname.trim() === "" || lastname.trim() === "") {
      return toast("First name and surname are required")
    }

    if (!checked) {
      return toast("You must accept terms of use")
    }
    
    setBusy(true);
    const res = await registerUser(firstname, lastname, email, password);
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
          <HeaderLogga/>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
    
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel color="tertiary" position="floating"> First name</IonLabel>
           <IonInput 
             onIonChange={(e: any) => setFirstname(e.target.value)}/></IonItem>
             <IonItem>
             <IonLabel color="tertiary" position="floating"> Last name</IonLabel>            
             <IonInput
             onIonChange={(e: any) => setLastname(e.target.value)}/></IonItem>
             <IonItem>
             <IonLabel color="tertiary" position="floating"> Email address</IonLabel>
             <IonInput
              onIonChange={(e: any) => setEmail(e.target.value)} /></IonItem>
              <IonItem>
              <IonLabel color="tertiary" position="floating"> Password</IonLabel>
              <IonInput
               type="password"
               onIonChange={(e: any) => setPassword(e.target.value)} /></IonItem>
               <IonItem>
               <IonLabel color="tertiary" position="floating"> Confirm password</IonLabel>
             <IonInput
               type="password"
               onIonChange={(e: any) => setCPassword(e.target.value)}/></IonItem>
              </IonList>
             <IonItem>
              <IonLabel color="tertiary"> I accept <Link to="/termsofuse">terms of use</Link></IonLabel>
            <IonCheckbox slot="start" checked={checked} onIonChange={e => setChecked(e.detail.checked)} /></IonItem>


        <IonButton onClick={register}>Register</IonButton>

        <p>Already have an account? <Link to="/login">Login</Link> </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
