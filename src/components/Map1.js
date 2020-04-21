import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './MapMarker';

class SimpleMap extends React.Component {
  state = {
    lat: "",
    lng: "",
    userPos: "",
  };
  
  static defaultProps = {
    center: {
      lat: 59.8,
      lng: 17.63889
    },
    zoom: 11
  };

  componentDidMount = () =>{
    navigator.geolocation.getCurrentPosition(this.currentCoords)
  };

  currentCoords = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    this.setState({
      userPos: {lat: latitude, lng: longitude},
    })
  };
 
  render() {
    const setCenter = this.state.userPos;
    const setUserPos = this.state.userPos;

    const apiIsLoaded = (map, maps, setUserPos) => {
      new maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.3,
        map,
        center: setUserPos,
        radius: 6000
      });
    };

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB1OBf8rN8thOb-BW9QdiMc06NOuBvFrNI' }}
          defaultCenter={this.props.center}
          center={setCenter}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, setUserPos)}
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