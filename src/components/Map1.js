import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker'
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.85882,
      lng: 17.63889
    },
    zoom: 11
  };
 
  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB1OBf8rN8thOb-BW9QdiMc06NOuBvFrNI' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MapMarker
            lat={59.85882}
            lng={17.63889}
            text="My Marker"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;