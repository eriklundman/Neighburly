import React, { useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './MapMarker';
import { getUserInfo, getRequest } from '../firebaseConfig'
import {
  pawOutline,
  flowerOutline,
  helpCircleOutline,
  basketOutline,
} from "ionicons/icons";
import { IonIcon, IonButton, IonButtons } from '@ionic/react';

//const AnyReactComponent = ({  pawOutline, flowerOutline, helpCircleOutline, basketOutline }) => <div><img src={img_src} className="YOUR-CLASS-NAME" style={{}} /></div>;


class SimpleMap extends React.Component {


  constructor(props){
    super(props);
    this.googleMapCircle = React.createRef();
    this.state = {
      lat: "",
      lng: "",
      userPos: "",
      radius: 1000,
      markers: []
    };
  }
  
  static defaultProps = {
    center: {
      lat: 59.8,
      lng: 17.63889
    },
    zoom: 11
  };

  componentDidMount = () => {


    if (navigator.geolocation){
      navigator.geolocation.watchPosition(this.currentCoords)
      this.newRadius();
    }

    let array = []
    array = getRequest()

    this.setState({
      markers: array
    });
  };

  markerClicked(marker) {
    console.log("The marker that was clicked is", marker);
    
  }



  currentCoords = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    this.setState(prevState => ({
      userPos: {
        ...prevState.userPos,
        lat: latitude, lng: longitude
      }
    })
    )
  };

   newRadius = () => {
     getUserInfo().then((result) => {
       if (result !== undefined) {
         this.setState({
           radius: result.radius
         })
       }
     });
   }



  componentDidUpdate = (prevState) => {
    if (prevState.radius !== this.state.radius) {
      //This is where I want to update radius
      }
    };

     apiIsLoaded = (map, maps, setUserPos, setUserRadius) => {
        var circle = new maps.Circle({
        ref:this.googleMapCircle,
        strokeColor: "001e57",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#bbd0ff",
        fillOpacity: 0.3,
        map:map,
        center: setUserPos,
        radius: setUserRadius
      });
    };
 
  render() {
    
    const setCenter = this.state.userPos;
    const setUserPos = this.state.userPos;
    const setUserRadius = this.state.radius;


    return (

      <div style={{ height: '100%', width: '100%' }}>

        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB1OBf8rN8thOb-BW9QdiMc06NOuBvFrNI' }}
          defaultCenter={this.props.center}
          center={setCenter}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            this.apiIsLoaded(map, maps, setUserPos, setUserRadius)
          }}>

          {this.state.markers.map((marker, i) => {
            let ico;
            if (marker.type === "shopping") {
              ico = basketOutline
            }
            else if (marker.type === "dog-walking") {
              ico = pawOutline
            }
            else if (marker.type === "gardening") {
              ico = flowerOutline
            }
            else {
              ico = helpCircleOutline
            }

            return (
              

                <IonButton
                  size="small"
                  color="dark"
                  fill="clear"
                  lat={marker.lat}
                  lng={marker.lng}
                  onClick={this.markerClicked.bind(this, marker)}>

                  <IonIcon
                    slot="icon-only"
                    icon={ico}
                  />

                </IonButton>
              

            )
          })}


          <Marker
            lat={setUserPos.lat}
            lng={setUserPos.lng}
            color="blue"
          />

          

        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;