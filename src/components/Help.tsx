import React, {useState, useEffect} from 'react';
import { IonSegmentButton, IonLabel, IonContent, IonSegment, IonToolbar, IonRow, IonGrid, IonList} from '@ionic/react';
import Request from '../components/Request';
import * as firebase from 'firebase'
const db = firebase.firestore();

/* kolla detta https://www.youtube.com/watch?v=44Avd9NBf7M elements, inte string */
const Help: React.FC = () => {
    const [mode, setMode] = useState('list active helps');
    const [info, setInfo] = useState([]);
    const [defValue, setDefValue] = useState("");
    const[id, setId] = useState<any>()

    useEffect(() => {
        setDefValue("activehelps")
        let userRef: any = firebase.auth().currentUser;
        setId(userRef.uid);
        let reqArr: any = [];
        let requestRef = db.collection("requests")

        requestRef.onSnapshot(snapshot => {
            reqArr = [];
            snapshot.forEach(req => {
                reqArr.push({ accepted: req.data().accepted, completed: req.data().completed, h_completed: req.data().h_completed, r_completed: req.data().r_completed, req_id: req.id, r_id: req.data().receiver_id, h_id: req.data().helper_id, type: req.data().type, des: req.data().description, r_fn: req.data().receiver_fn, r_ln: req.data().receiver_ln, h_fn: req.data().helper_fn, h_ln: req.data().helper_ln, chatId: req.data().chatId })

            });
            loadData(reqArr);
        })

    }, []);

    function loadData(data : any) {
        setInfo(data)

    }

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
                </IonToolbar>
                <IonList>
                    {defValue === "activehelps" ? info.map((item: any, index: number) => (
                         item.accepted === true && item.completed === false ?
                            item.h_id === id ? <Request key={index} item={item} type={"youWillHelp"}/>
                                : item.r_id === id ? <Request key={index} item={item} type={"helpingYou"}/>
                                : console.log()
                            : console.log()))

                        : info.map((item: any, index: number) => (
                                item.completed === true && item.h_id === id ? <Request key={index} item={item} type={"iHelped"}/>
                                    : item.completed === true && item.r_id === id ? <Request key={index} item={item} type={"beenHelped"}/>
                                    : console.log()
                    ))}

                </IonList>
            </IonGrid>

        </IonContent>
    );
}

export default Help;