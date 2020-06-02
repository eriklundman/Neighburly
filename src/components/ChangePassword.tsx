import React from 'react';
import {IonItem, IonText } from '@ionic/react';
import { Link } from 'react-router-dom';


const ChangePassword = () => {
    return (
        <IonItem lines="none">
            <Link to="/updatepassword">
                    <IonText  color="secondary">Change Password </IonText>
            </Link>
            </IonItem>


    );
};

export default ChangePassword;