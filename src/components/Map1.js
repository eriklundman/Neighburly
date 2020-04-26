import React from 'react';
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

  state = {
    lat: "",
    lng: "",
    userPos: "",
    radius: 1500,
    markers: []
  };

  static defaultProps = {
    center: {
      lat: 59.8,
      lng: 17.63889
    },
    zoom: 11,
  };

  componentDidMount = () => {

    getUserInfo().then((result) => {
      if (result !== undefined) {
        this.setState({
          radius: result.radius
        })
      }
    });

    navigator.geolocation.getCurrentPosition(this.currentCoords)

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

  /* newRadius = () => {
     getUserInfo().then((result) => {
       if (result !== undefined) {
         this.setState({
           radius: result.radius
         })
       }
     });
   }*/



  render() {

    const setCenter = this.state.userPos;
    const setUserPos = this.state.userPos;
    const setUserRadius = this.state.radius;
    //console.log(setUserRadius)

    const apiIsLoaded = (map, maps, setUserPos, setUserRadius) => {
      let circle = new maps.Circle({
        strokeColor: "001e57",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#bbd0ff",
        fillOpacity: 0.3,
        map,
        center: setUserPos,
        radius: setUserRadius
      });



    };


    return (

      <div style={{ height: '100%', width: '100%' }}>

        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB1OBf8rN8thOb-BW9QdiMc06NOuBvFrNI' }}
          defaultCenter={this.props.center}
          center={setCenter}
          defaultZoom={this.props.zoom}
          setUserRadius={this.state.radius}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            apiIsLoaded(map, maps, setUserPos, setUserRadius)
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
                    slot="start"
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