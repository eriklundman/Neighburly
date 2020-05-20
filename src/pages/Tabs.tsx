import React, {useEffect, useState} from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonBadge, IonModal, IonContent, IonButtons, IonButton, IonItem, IonCard
} from '@ionic/react';
import { personOutline, navigateCircleOutline, heartOutline, menuOutline } from 'ionicons/icons';
import MenuTab from './MenuTab';
import HelpTab from './HelpTab';
import MapTab from './MapTab';
import ProfileTab from './ProfileTab';
import MakeRequest from './MakeRequest';
import EditYourProfile from './EditYourProfile';
import GetInfo from './GetInfo';
import TermsOfUse from './TermsOfUse';
import TopTen from './topTen';
import './Tabs.css';
import * as firebase from "firebase";
import UpdatePassword from './UpdatePassword';
import ReportUser from './ReportUser';
import {cancelRequest, helpRequest, removeNoticeHelper} from "../firebaseConfig";
import StarRatingComponent from "react-star-rating-component";
const db = firebase.firestore();





const Tabs: React.FC = () => {
    const history = useHistory();
  const [newMessage, setNewMessage] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [alertInfo, setAlertInfo] = useState([]);
    const [helpAccepted, setHelpAccepted] = useState([]);
    const[rating, setRating] = useState(0);
    const [messageCounter, setMessageCounter] = useState(0);

 //listener for new messages
  useEffect(() => {
    let boolArray: boolean[] = [];
    let userRef : any = firebase.auth().currentUser;
    let unsubscribe = db.collection("chats").where('participants', 'array-contains',
        userRef.uid)
        .onSnapshot(function (snapshot) {
          boolArray = [];
          snapshot.forEach(function (change) {
            let lastMessage = change.data().newMessage;
            if (lastMessage === userRef.uid || lastMessage === "noNew") {
                boolArray.push(false);
                setNewMessage(false)
            }
            else {
                setNewMessage(true)
                boolArray.push(true)
            }
          });
          checkBoolArray(boolArray)
        });
    //listener for when helper want to help
    let unsubscribe2 = db.collection("requests").where('accepted', '==', false).where('receiver_id', '==', userRef.uid)
        .onSnapshot(function(snapshot) {
            let infoArr : any = [];
            snapshot.forEach(function(change) {

                if (change.data().helper_id) {
                    infoArr.push({fn: change.data().helper_fn, ln: change.data().helper_ln, description: change.data().description, req_id: change.id});


                    db.collection("users").doc(change.data().helper_id).get().then((doc : any) => {
                        setRating(doc.data().rating)
                    })

                    setShowAlert(true);
                }

        });

            setAlertInfo(infoArr)
        })

      //listener for when receiver have accepted the help
      let unsubscribe3 = db.collection("requests").where("accepted", "==", true).where("helper_id", "==", userRef.uid).where("noticeHelper", "==", false)
          .onSnapshot(function(snapshot) {
              let array : any = [];
              snapshot.forEach(function(change) {
                  console.log(change.data().accepted)
                  if (change.data().accepted === true) {
                      array.push({fn: change.data().receiver_fn, ln: change.data().receiver_ln, req_id: change.id, chatId: change.data().chatId})
                  }
                  setShowAlert2(true)
              })
              setHelpAccepted(array);
          })
      return () => {unsubscribe(); unsubscribe2(); unsubscribe3()}
  }, []);

  function checkBoolArray(array : any) {
      if (array.includes(true)) {
          let counter = 0;
          for (let i in array) {
              if (array[i]) {
                  counter++;
              }
          }
          setMessageCounter(counter)
          return setNewMessage(true)
      }
      return setNewMessage(false)
  }


  function acceptRequest(req_id : any) {
      helpRequest(req_id);
      history.replace("/helpTab")
  }

  function declineRequest(req_id : any) {
      cancelRequest(req_id);
  }

  function helpNow (req_id : any, chat_id : any) {
      removeNoticeHelper(req_id);
      history.replace(`/chat/${chat_id}`)
  }

  function helpLater(req_id : any) {
      removeNoticeHelper(req_id);

  }


  return (
    <IonContent>
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/menuTab" component={MenuTab} exact={true} />
        <Route path="/menuTab/top10/" component={TopTen}/>
        <Route path="/menuTab/info/" component={GetInfo}/>
        <Route path="/menuTab/termsandconditions/" component={TermsOfUse}/>
        <Route path="/helpTab" component={HelpTab} exact={true} />
        <Route path="/mapTab" component={MapTab} exact={true} />
        <Route path="/mapTab/makerequest/" component={MakeRequest}/>
        <Route path="/profileTab" component={ProfileTab} exact={true} />
        <Route path="/edityourprofile" component={EditYourProfile}/>
        <Route path="/updatepassword" component={UpdatePassword}/>
        <Route path="/reportuser" component={ReportUser}/>
        <Route path="/tabs" render={() => <Redirect to="/mapTab"/>} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton className="tabColor" tab="menuTab" href="/menuTab">
          <IonIcon icon={menuOutline} />
          <IonLabel >Menu</IonLabel>
        </IonTabButton>
        <IonTabButton className="tabColor" tab="helpTab" href="/helpTab">
          {newMessage && <IonBadge color="danger">{messageCounter}</IonBadge>}
          <IonIcon icon={heartOutline} />
          <IonLabel>Helps</IonLabel>
        </IonTabButton>
        <IonTabButton className="tabColor" tab="mapTab" href="/mapTab">
          <IonIcon icon={navigateCircleOutline} />
          <IonLabel>Requests</IonLabel>
        </IonTabButton>
        <IonTabButton className="tabColor" tab="profileTab" href="/profileTab">
          <IonIcon icon={personOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>

        {alertInfo.map((item: any, index: number) =>
        <IonModal key={index} cssClass="accepted-modal" isOpen={showAlert} backdropDismiss={false}>
            <IonCard className="accepted-card">
                <h3 className="title-design">{item.fn } {item.ln[0]} wants to help!</h3>
                <div  className="rating-design"
                      style={{ fontSize: 25 }}>
                    <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={rating}
                        editing={false}
                        starColor="#194afb"
                        emptyStarColor="#bbd0ff"
                    />

                </div>
                <h5 className="info-text">Your request:</h5>
                <p className="info-text">{item.description}</p>

                <p className="info-text" style={{fontWeight:"bold"}}>Accept to chat and make arrangements</p>

                <IonItem></IonItem>
            <IonButtons className="buttons-accepted">
                <IonButton
                    className="cancel-button"
                    fill="clear"
                    expand="full"
                    onClick={() => declineRequest(item.req_id)}
                >
                    Cancel
                </IonButton>
                <IonButton expand="full" fill="clear" className="done-button" onClick={() => acceptRequest(item.req_id)}>Accept request</IonButton>
            </IonButtons>
            </IonCard>
        </IonModal>)
        }

        {helpAccepted.map((item: any, index: number) =>
            <IonModal key={index} cssClass="accepted-modal" isOpen={showAlert2} backdropDismiss={false}>
                <IonCard className="accepted-card">
                    <h3 className="title-design">{item.fn } {item.ln[0]} has accepted your help!</h3>
                    <h5 className="info-text">Go and chat right now!</h5>
                    <p className="info-text">If you choose not to chat right now, you can always do it later in <b>Helps</b></p>

                    <IonItem></IonItem>
                    <IonButtons className="buttons-accepted">
                        <IonButton
                            className="cancel-button"
                            fill="clear"
                            expand="full"
                            onClick={() => helpLater(item.req_id)}
                        >
                            Later
                        </IonButton>
                        <IonButton expand="full" fill="clear" className="done-button" onClick={() => helpNow(item.req_id, item.chatId)}>Chat now!</IonButton>
                    </IonButtons>
                </IonCard>
            </IonModal>)
        }

    </IonContent>

  )
}

export default Tabs;