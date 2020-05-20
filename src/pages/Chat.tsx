import React, {useEffect, useState, useRef} from 'react';
import * as firebase from 'firebase'
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonLabel, IonInput, IonItem, IonFooter, IonButtons, IonBackButton , useIonViewDidLeave, IonCol, IonTextarea, useIonViewDidEnter
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
    const [notice, setNotice] = useState("noNew");
    const [user1, setUser1] = useState("");
    const [user2, setUser2] = useState("");
    const chat = useRef<HTMLIonTextareaElement>(null);

    const chatId = props.match.params.id;
    let unsubscribe : any;

    useEffect(() => {
        if (getUserInfo() !== undefined) {
            let userRef : any = firebase.auth().currentUser;
            setId(userRef.uid);
            getUserInfo().then((result: any) => {
                setFn(result.firstname);
            }).catch();
        }

        unsubscribe = db.collection("chats").doc(chatId).onSnapshot(snapshot => {
            updateMessages(snapshot.data())
        })

    }, []);

    function updateMessages(data : any) {
        setChats(data.messages);
        setNotice(data.newMessage);
        setUser1(data.names[0]);
        setUser2(data.names[1]);
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

        return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + " " + date.toLocaleDateString()
    }

    useIonViewDidLeave(() => {
        unsubscribe()

    });

    useIonViewDidEnter(() => {
        chat.current?.setFocus()
    })

    return (
        <IonPage>
            {notice === "noNew" || notice === id ? console.log() : updateNotice(chatId)}
           <IonHeader>
          <IonToolbar color="primary">
              {user1 === fn ?
                  <IonTitle color="tertiary">{user2}</IonTitle> :
                  <IonTitle color="tertiary">{user1}</IonTitle>}

        <IonButtons slot="start">
        <IonBackButton text="" icon={chevronBackOutline} color="tertiary" defaultHref="/HelpTab" />
      </IonButtons>
      </IonToolbar>
      </IonHeader>
            <IonContent>
                    <div >
                        {chats.map((item: any, index: number) => (item.uId === id ?

                                    <div className="you" key={index}>
                                        <span className="timeStamp">{date(item.timeStamp)} </span>
                                        {item.content}
                                    </div>
                                    :
                            <div key={index}>
                                <span className="name">{item.name}</span>
                                 <div  className="other" >
                                     <span className="timeStamp">{date(item.timeStamp)} </span>
                                      {item.content}
                                 </div>
                            </div>
                        ))}

                    </div>
                    <IonLabel id="bottom"></IonLabel>
            </IonContent>
            <IonFooter>
                <IonItem color="light">
                    <div className="send-area">
                    <IonTextarea
                            ref={chat}
                            autoGrow={true}
                            rows={1}
                            className="design-text-area"
                            placeholder=" Message"
                            value={message}
                            onIonChange={(e: any) => setMessage(e.target.value)}/>
                    <IonButton fill="outline" className="sendButton" slot="end" onClick={sendMessage}>Send</IonButton>
                    </div> 
                    </IonItem>
            </IonFooter>
        </IonPage>
    );
};

export default Chat;