import React from 'react';
import './MapMarker.css';

const Marker = (props: any) => {
    const {color} = props;
    return (
      <div className="marker"
      style={{ backgroundColor: color, cursor: 'pointer'}}
      />
    );
  };

  export default Marker;