import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  IonLabel,
  IonButton,
  IonInput,
  IonPage,
  IonContent, 
  IonLoading,
  IonList,
  IonItem,
  IonCheckbox,
  IonHeader,
  IonToolbar,
  IonImg
} from '@ionic/react';
import { registerUser } from '../firebaseConfig'
import "./Register.css"
import { toast } from "../toast";


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
    setBusy(false)
  }

  return (

    <IonPage>
         <IonHeader>
        <IonToolbar className="header-toolbar-reg">
      <IonImg className="loggan-reg" src="assets/icon/logga3.png"> </IonImg>
      </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={busy} />
    
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel color="tertiary" position="floating"> First name</IonLabel>
           <IonInput 
           type="text"
             onIonChange={(e: any) => setFirstname(e.target.value)}/></IonItem>
             <IonItem>
             <IonLabel color="tertiary" position="floating"> Last name</IonLabel>            
             <IonInput
             type="text"
             onIonChange={(e: any) => setLastname(e.target.value)}/></IonItem>
             <IonItem>
             <IonLabel color="tertiary" position="floating"> Email address</IonLabel>
             <IonInput
             type="email"
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
             <IonItem className="accept-terms" lines="none">
             <IonCheckbox slot="start" checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
              <IonLabel color="tertiary"> I accept <Link className="link-color" to="/termsofuse">Terms of use</Link></IonLabel>
            </IonItem>


        <IonButton className="register-button" expand="full" onClick={register}>Register</IonButton>

        <IonItem lines="none">
        <p>Already have an account? <Link className="link-color" to="/login">Login</Link> </p>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Register;
