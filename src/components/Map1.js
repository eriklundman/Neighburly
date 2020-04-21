import React, { Component} from 'react';
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
      lat: 59,
      lng: 17.63889
    },
    zoom: 11
  };

  componentWillMount = () =>{
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
    const setCenter = this.state.userPos
    const setUserPos = this.state.userPos
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB1OBf8rN8thOb-BW9QdiMc06NOuBvFrNI' }}
          defaultCenter={this.props.center}
          center={setCenter}
          defaultZoom={this.props.zoom}
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