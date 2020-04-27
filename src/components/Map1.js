import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./MapMarker";
import { getUserInfo, getRequest, helpRequest } from "../firebaseConfig";
import {
  pawOutline,
  flowerOutline,
  helpCircleOutline,
  basketOutline,
} from "ionicons/icons";
import { IonIcon, IonButton, IonAlert, IonContent } from "@ionic/react";

//const AnyReactComponent = ({  pawOutline, flowerOutline, helpCircleOutline, basketOutline }) => <div><img src={img_src} className="YOUR-CLASS-NAME" style={{}} /></div>;

class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
      userPos: "",
      radius: 1000,
      markers: [],
      showAlert: false,
      des: "",
      reqType: "",
      name: "",
      req_id: "",
      mapRef: "",
      mapsRef: "",
      circle:""
    };
  }
  

  static defaultProps = {
    center: {
      lat: 59.8,
      lng: 17.63889,
    },
    zoom: 11,
  };

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(this.currentCoords);
      this.newRadius();
    }

    let array = [];
    array = getRequest();

    this.setState({
      markers: array,
    });

  };

  markerClicked(marker) {

    this.setState({ showAlert: true });
    this.setState({ des: marker.des });
    this.setState({ name: marker.r_fn + " " + marker.r_ln })
    this.setState({ req_id: marker.req_id })


    if (marker.type === "shopping") {
      this.setState({ reqType: "Shopping" })
    } else if (marker.type === "dog-walking") {
      this.setState({ reqType: "Dog Walking" })
    } else if (marker.type === "gardening") {
      this.setState({ reqType: "Gardening" })
    } else {
      this.setState({ reqType: "Other" })
    }

  }

  currentCoords = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    this.setState((prevState) => ({
      userPos: {
        ...prevState.userPos,
        lat: latitude,
        lng: longitude,
      },
    }));
  };

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

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.radius !== this.state.radius) {
      console.log(this.state.circle.setRadius(this.state.radius))

    }
  };

  takeRequest = () => {
    helpRequest(this.state.req_id);
  }


  apiIsLoaded = (map, maps) => {
      this.setState({mapRef:map})
      this.setState({mapsRef:maps})

      this.setState({circle: new this.state.mapsRef.Circle({
      strokeColor: "001e57",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#bbd0ff",
      fillOpacity: 0.3,
      map: this.state.mapRef,
      center: this.state.userPos,
      radius: this.state.radius
    })});
};

  render() {
    this.newRadius();

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB1OBf8rN8thOb-BW9QdiMc06NOuBvFrNI" }}
          defaultCenter={this.props.center}
          center={this.state.userPos}
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
            buttons={["Cancel", {
              text: 'Help',
              handler: () => {
                this.takeRequest();
              }
            }]}
          />

          {this.state.markers.map((marker, i) => {
            let ico;
            if (marker.type === "shopping") {
              ico = basketOutline;
            } else if (marker.type === "dog-walking") {
              ico = pawOutline;
            } else if (marker.type === "gardening") {
              ico = flowerOutline;
            } else {
              ico = helpCircleOutline;
            }

            if (marker.accepted == false) {
              return (
                <IonButton
                  size="small"
                  color="dark"
                  fill="clear"
                  lat={marker.lat}
                  lng={marker.lng}
                  onClick={this.markerClicked.bind(this, marker)}
                  style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}
                >
                  <IonIcon slot="icon-only" icon={ico} />
                </IonButton>
              );
            }
          })}

          <Marker lat={this.state.userPos.lat} lng={this.state.userPos.lng} color="blue" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
