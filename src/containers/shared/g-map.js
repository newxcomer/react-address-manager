import React from 'react';
import { withGoogleMap, GoogleMap, InfoWindow } from "react-google-maps";

export const GMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={16}
    center={props.center}
    onClick={props.onMapClick}
  >
    {props.center && (
      <InfoWindow position={props.center}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
  </GoogleMap>
));
