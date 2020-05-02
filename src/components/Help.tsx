import React, {useState, useEffect} from 'react';
import { IonSegmentButton, IonLabel, IonContent, IonSegment, IonToolbar, IonRow, IonGrid, IonList} from '@ionic/react';
import Request from '../components/Request';
import {getRequest, getYourRequest} from "../firebaseConfig";


/* kolla detta https://www.youtube.com/watch?v=44Avd9NBf7M elements, inte string */
const Help: React.FC = () => {
    const [mode, setMode] = useState('list active helps');
    const [info, setInfo] = useState([]);
    const [defValue, setDefValue] = useState("");

    useEffect(() => {
        setInfo(getYourRequest())
        setDefValue("activehelps")

    }, []);

    function active() {
        setMode("list active helps");
        setDefValue("activehelps");


    }

    function inactive() {
        setMode("list inactive helps");
        setDefValue("inactivehelps");

    }

    return (
        <IonContent>
            <IonGrid>
                <IonToolbar>
                    <IonRow>
                        <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)} value={defValue}>
                            <IonSegmentButton onClick={active} value="activehelps" >
                                <IonLabel>Active helps</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton onClick={inactive} value="inactivehelps" >
                                <IonLabel>Inactive helps</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </IonRow>
                    <IonRow>
                        <p>{mode}</p>
                    </IonRow>
                </IonToolbar>
                <IonList>
                    {info.map((item: any, index: number) => (
                        <Request key={index} item={item}/>
                    ))}

                </IonList>
            </IonGrid>
        </IonContent>
    );
}

export default Help;