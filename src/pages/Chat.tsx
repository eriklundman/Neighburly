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
    IonList, IonLabel, IonInput, IonItem, IonFooter, IonButtons, IonBackButton , useIonViewDidLeave
} from '@ionic/react'
import './Chat.css';
import {getUserInfo, storeMessage, updateNotice} from "../firebaseConfig";
import { chevronBackOutline } from 'ionicons/icons';
const db = firebase.firestore();

const Chat: React.FC<any> = (props) => {
    const [message, setMessage] = useState("");
    const [fn, setFn] = useState("");
    const [id , setId] = useState<any>("");
    const [chats, setChats] = useState([]);
    const [notice, setNotice] = useState("noNew")
    const chatId = props.match.params.id;
    let unsubscribe : any;

    useEffect(() => {
        if (getUserInfo() !== undefined) {
            let userRef : any = firebase.auth().currentUser;
            setId(userRef.uid);
            getUserInfo().then((result: any) => {
                setFn(result.firstname);

            });
        }

        unsubscribe = db.collection("chats").doc(chatId).onSnapshot(snapshot => {
            updateMessages(snapshot.data())
        })

    }, []);

    function updateMessages(data : any) {
        setChats(data.messages);
        setNotice(data.newMessage);
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
    function date(timeStamp : any) {
        let date = new Date(timeStamp);
        // test.toLocaleDateString()
        // test.toLocaleTimeString()
        return date.toLocaleDateString() + " " + date.toLocaleTimeString()
    }

    useIonViewDidLeave(() => {
        unsubscribe()

    });

    return (
        <IonPage>
            {notice === "noNew" || notice === id ? console.log() : updateNotice(chatId)}
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
                        {chats.map((item: any, index: number) => (item.uId === id ?
                                <div className="you" key={index}>
                                    {item.name}:
                                    {item.content}
                                </div> :
                                 <div key={index} className="other" >
                                     {item.name}: {item.content}
                                 </div>
                            
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