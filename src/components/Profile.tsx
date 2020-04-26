
import React from 'react';
import { IonContent, IonIcon, IonGrid, IonRow, IonText, IonLabel, IonSegment, IonSegmentButton, IonToolbar, IonCol} from '@ionic/react';
import {getUserInfo, credChange} from '../firebaseConfig'
import { personCircleOutline } from 'ionicons/icons';
import SettingsBtn from '../components/EditProfile';

class Profile extends React.Component {
    state = {
        fn: "",
        ln: "",
        email: "",
        mode: 'You have helped (antal) persons'}

    componentDidMount(): void {
        getUserInfo().then((result: any) => {
            if (result !== undefined) {
                this.setState({
                    fn: result.firstname,
                    ln: result.lastname,
                    email: result.email
                })
            }
        });
    }
    componentDidUpdate() {
        credChange().then(update => {
            if (update) {
                this.componentDidMount()
            }
        })

    }


    render()
    {
        return (
            <IonContent>
                <IonGrid>

                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol>
                            <IonIcon size="large" color="tertiary" icon={personCircleOutline}/>
                            <IonText>{this.state.fn} {this.state.ln}</IonText>
                        </IonCol>
                        <IonCol></IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol>
                            <SettingsBtn/>
                        </IonCol>
                        <IonCol></IonCol>
                    </IonRow>


                    <IonRow>
                        <IonCol></IonCol>
                        <IonCol className="ion-text-center">
                            <p>{this.state.mode}</p>
                        </IonCol>
                        <IonCol></IonCol>
                    </IonRow>

                    <IonRow>
                        <IonToolbar>
                            <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
                                <IonSegmentButton
                                    onClick={() => this.setState({mode: this.state.mode === 'You have helped (antal) persons' ? 'You have been helped by(antal) persons' : 'You have helped (antal) persons'})}
                                    value="helper">
                                    <IonLabel>Helper</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton
                                    onClick={() => this.setState({mode: this.state.mode === 'You have helped (antal) persons' ? 'You have been helped by(antal) persons' : 'You have been helped by(antal) persons'})}
                                    value="receiver">
                                    <IonLabel>Receiver</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </IonToolbar>
                    </IonRow>

                </IonGrid>
            </IonContent>
        );
    }
}

export default Profile;
