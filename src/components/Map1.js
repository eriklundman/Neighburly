import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './MapMarker';
import {getUserInfo} from '../firebaseConfig'
import { setUserState } from '../redux/actions';

class SimpleMap extends React.Component {
  state = {
    lat: "",
    lng: "",
    userPos: "",
    radius: 1500
  };


  
  static defaultProps = {
    center: {
      lat: 59.8,
      lng: 17.63889
    },
    zoom: 11,
  };



  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(this.currentCoords)
    this.getRadius()
  };

  
  
  currentCoords = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    this.setState(prevState => ({
      userPos: {...prevState.userPos,
        lat: latitude, lng: longitude
      }
    }) 
    )
  };

  getRadius = () => {
    getUserInfo().then((result) => {
      this.setState({
        radius: result.radius
      })
      
      }); 
  }
 
  render() {
    
    const setCenter = this.state.userPos;
    const setUserPos = this.state.userPos;
    const setUserRadius = this.state.radius;
    //console.log(setUserRadius)

    const apiIsLoaded = (map, maps, setUserPos) => {
      let circle = new maps.Circle({
        strokeColor: "001e57",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#bbd0ff",
        fillOpacity: 0.3,
        map,
        center: setUserPos,
      });
      circle.setRadius(this.state.radius)
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
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, setUserPos, setUserRadius)}
        >
          

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