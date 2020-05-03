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
import Request from "../components/Request";
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
            retrieveMessages(chatId).then((data : any) => {
                setChats(data.messages);
            })
        }

    }, []);


    function sendMessage() {
        if (message !== "") {
            storeMessage(message, chatId , fn)
            setMessage("")
            retrieveMessages(chatId).then((data : any) => {
                setChats(data.messages);
            })

        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonTitle>Chat</IonTitle>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonList>
                        {chats.map((item: any, index: number) => (
                            <IonItem key={index}>{item.name}: {item.content}</IonItem>
                        ))}

                    </IonList>
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