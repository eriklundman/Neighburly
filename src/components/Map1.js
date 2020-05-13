import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./MapMarker";
import {
  getUserInfo,
  getUserId,
  deleteRequest,
  waitForAcceptRequest
} from "../firebaseConfig";
import {
  paw,
  flowerSharp,
  helpCircle,
  cart,
} from "ionicons/icons";
import { IonIcon, IonButton, IonAlert, withIonLifeCycle } from "@ionic/react";

import { Plugins } from "@capacitor/core";
import * as firebase from 'firebase'
import "./Request.css";
const db = firebase.firestore();


class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
      userPos: { lat: 59.379917, lng: 15.846315 },
      radius: 0,
      markers: [],
      showAlert: false,
      showAlert2: false,
      des: "",
      reqType: "",
      name: "",
      req_id: "",
      mapRef: "",
      mapsRef: "",
      circle: "",
      userId: "",
    };
  }

  static defaultProps = {
    center: {
      lat: 59.8,
      lng: 17.63889,
    },
    zoom: 11,
  };

  getCurrentPosition = () => {
    const { Geolocation } = Plugins;

    const wait = Geolocation.watchPosition(
      { timeout: 30000, enableHighAccuracy: true },
      (position, err) => {
        if(position){
        this.setState({
          userPos: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      }
      }
    );
  };

  componentDidMount = () => {

    this.getCurrentPosition();

    let uid = "";
    uid = getUserId();
    this.setState({
      userId: uid,
    });


    let array = [];
    let requestRef = db.collection("requests")
    requestRef.onSnapshot(snapshot => {
      array = [];
      snapshot.forEach(req => {
        array.push({ accepted: req.data().accepted, req_id: req.id, lat: req.data().coordinates[0], lng: req.data().coordinates[1], type: req.data().type, des: req.data().description, r_fn: req.data().receiver_fn, r_ln: req.data().receiver_ln, r_id: req.data().receiver_id , h_id: req.data().helper_id})
      });
      this.loadData(array);
    })

  };

  loadData(array) {
    this.setState({
      markers: array,
    });
  }

  markerClicked(marker) {
    if (marker.r_id === firebase.auth().currentUser.uid) {
      this.setState({ showAlert2: true });
    } else {
      this.setState({ showAlert: true });
    }

    this.setState({ des: marker.des });
    this.setState({ name: marker.r_fn + " " + marker.r_ln });
    this.setState({ req_id: marker.req_id });

    if (marker.type === "shopping") {
      this.setState({ reqType: "Shopping" });
    } else if (marker.type === "dog-walking") {
      this.setState({ reqType: "Dog Walking" });
    } else if (marker.type === "gardening") {
      this.setState({ reqType: "Gardening" });
    } else {
      this.setState({ reqType: "Other" });
    }
  }

  newRadius = () => {
    getUserInfo().then((result) => {
      if (result !== undefined) {
        this.setState({
          radius: result.radius,
        });
      }
    });
  };

  setShowAlertFalse = () => {
    this.setState({ showAlert: false });
  };

  setShowAlertFalse2 = () => {
    this.setState({ showAlert2: false });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.radius !== this.state.radius &&
      this.state.circle !== "" &&
      this.state.circle !== undefined
    ) {
      this.state.circle.setRadius(this.state.radius);
      this.props.setUserPosition(this.state.userPos, this.state.radius);
    }
    if (
      prevState.userPos !== this.state.userPos &&
      this.state.circle !== "" &&
      this.state.circle !== undefined
    ) {
      this.state.circle.setOptions({ center: this.state.userPos });
      this.props.setUserPosition(this.state.userPos, this.state.radius);
    }
  };

  takeRequest = () => {
    this.props.redirectToHelpTab()
    waitForAcceptRequest(this.state.req_id);
  };

  eraseRequest = () => {
    deleteRequest(this.state.req_id);
  };

  ionViewDidEnter() {
    this.newRadius();
  }

  apiIsLoaded = (map, maps) => {
    this.setState({ mapRef: map });
    this.setState({ mapsRef: maps });
    this.setState({
      circle: new this.state.mapsRef.Circle({
        strokeColor: "001e57",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#bbd0ff",
        fillOpacity: 0.3,
        map: this.state.mapRef,
        center: this.state.userPos,
        radius: this.state.radius,
      }),
    });
  };

  createMapOptions = (maps) => {
    return{zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_TOP,
      style: maps.ZoomControlStyle.SMALL
    },
    fullscreenControl:false
  }
  }

  render() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB1OBf8rN8thOb-BW9QdiMc06NOuBvFrNI" }}
          defaultCenter={this.props.center}
          center={this.state.userPos}
          options={this.createMapOptions}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            this.apiIsLoaded(map, maps);
          }}
        >
          <IonAlert
            isOpen={this.state.showAlert}
            onDidDismiss={() => this.setShowAlertFalse()}
            header={this.state.name}
            subHeader={this.state.reqType}
            message={this.state.des}
            buttons={[
              {text: "Cancel", cssClass:"alert-buttons"},
              {
                cssClass:"alert-buttons",
                text: "Help",
                handler: () => {
                  this.takeRequest();
                },
              },
            ]}
          />

          <IonAlert
            isOpen={this.state.showAlert2}
            onDidDismiss={() => this.setShowAlertFalse2()}
            header="Your Own Request"
            subHeader={this.state.reqType}
            message={this.state.des}
            buttons={[
              "Cancel",
              {
                text: "Delete",
                handler: () => {
                  this.eraseRequest();
                },
              },
            ]}
          />

          {this.state.markers.map((marker, index) => {
            let ico;
            if (marker.type === "shopping") {
              ico = cart;
            } else if (marker.type === "dog-walking") {
              ico = paw;
            } else if (marker.type === "gardening") {
              ico = flowerSharp;
            } else {
              ico = helpCircle;
            }

            if (marker.accepted === false && marker.r_id !== this.state.userId && marker.h_id === undefined) {
              return (
                <IonButton
                  size="small"
                  color="tertiary"
                  fill="clear"
                  lat={marker.lat}
                  lng={marker.lng}
                  onClick={this.markerClicked.bind(this, marker)}
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <IonIcon size="large" slot="icon-only" icon={ico} />
                </IonButton>
              );
            }
            if (marker.accepted === false && marker.r_id === this.state.userId && marker.h_id === undefined) {
              return (
                <IonButton
                  size="small"
                  color="secondary"
                  fill="clear"
                  lat={marker.lat}
                  lng={marker.lng}
                  onClick={this.markerClicked.bind(this, marker)}
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <IonIcon size="large" slot="icon-only" icon={ico} />
                </IonButton>
              );
            }
          })}

          <Marker
            lat={this.state.userPos.lat}
            lng={this.state.userPos.lng}
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default withIonLifeCycle(SimpleMap);
