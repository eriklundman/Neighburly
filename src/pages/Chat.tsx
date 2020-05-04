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
    IonList, IonLabel, IonInput, IonItem, IonFooter
} from '@ionic/react';
import {getUserInfo, retrieveMessages, storeMessage} from "../firebaseConfig";
const db = firebase.firestore();

const Chat: React.FC<any> = (props) => {
    const [message, setMessage] = useState("");
    const [fn, setFn] = useState("");
    const [chats, setChats] = useState([]);
    const chatId = props.match.params.id;


    useEffect(() => {
        if (getUserInfo() !== undefined) {
            getUserInfo().then((result: any) => {
                setFn(result.firstname);
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
                <IonTitle>Chat</IonTitle>
            </IonHeader>
            <IonContent >
                <IonGrid>
                    <IonList>
                        {chats.map((item: any, index: number) => (
                            <IonItem key={index}>{item.name}: {item.content}</IonItem>
                        ))}

                    </IonList>
                    <IonLabel id="bottom"></IonLabel>
                </IonGrid>


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