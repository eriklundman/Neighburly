import React, {useEffect, useState} from 'react';
import * as firebase from 'firebase'
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonGrid,
    IonList, IonLabel, IonInput, IonItem, IonFooter, IonButtons, IonBackButton
} from '@ionic/react'
import './Chat.css';
import {getUserInfo, retrieveMessages, storeMessage} from "../firebaseConfig";
import { chevronBackOutline } from 'ionicons/icons';
const db = firebase.firestore();

const Chat: React.FC<any> = (props) => {
    const [message, setMessage] = useState("");
    const [fn, setFn] = useState("");
    const [id , setId] = useState<any>("")
    const [chats, setChats] = useState([]);
    const chatId = props.match.params.id;


    useEffect(() => {
        if (getUserInfo() !== undefined) {
            let userRef : any = firebase.auth().currentUser;
            setId(userRef.uid);
            getUserInfo().then((result: any) => {
                setFn(result.firstname);
                setId(result.uI)
            });
        }
        db.collection("chats").doc(chatId).onSnapshot(snapshot => {
            updateMessages(snapshot.data())
        })
    }, []);


    function updateMessages(data : any) {
        setChats(data.messages);
        ScrollToBottom()

    }

    function sendMessage() {
        if (message !== "") {
            storeMessage(message, chatId , fn)
            setMessage("")
            //retrieveMessages(chatId).then((data : any) => {
             //   setChats(data.messages);
           // })

        }
    }
    function ScrollToBottom(){
        let element : any = document.getElementById("bottom");
        // I can't remember why I added a short timeout,
        // but you might be able to use ngzone instead.
        // the below works great though.
        setTimeout(()=>{element.scrollIntoView({behavior: 'smooth'})},100);
    }

    return (
        <IonPage>
           <IonHeader>
          <IonToolbar color="primary">
        <IonTitle color="tertiary">Chat</IonTitle>
        <IonButtons slot="start">
        <IonBackButton text="" icon={chevronBackOutline} color="tertiary" defaultHref="/HelpTab" />
      </IonButtons>
      </IonToolbar>
      </IonHeader>
            <IonContent>

                    <div >
                        {chats.map((item: any, index: number) => (
                         id !== item.uId ?  <div className="you" key={index}>{item.name}: {item.content}</div> :
                             <div className="other" key={index}>{item.name}: {item.content}</div>
                        ))}

                    </div>
                    <IonLabel id="bottom"></IonLabel>



            </IonContent>
            <IonFooter>
                <IonItem>
                    <IonLabel position="floating"> Message</IonLabel>
                    <IonInput value={message} type="text"
                              onIonChange={(e: any) => setMessage(e.target.value)} />
                    <IonButton onClick={sendMessage}>Send</IonButton>
                </IonItem>
            </IonFooter>
        </IonPage>
    );
};

export default Chat;