import React, { useRef } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { IonList, IonItem, IonLabel} from "@ionic/react";
import "./AddressInput.css";

const PlacesAutocomplete = (props) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "se" } },
  });
  const ref = useRef();

  useOnclickOutside(ref, () => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        props.setCoords([lat, lng]);
        console.log("📍 Coordinates: ", props.coords);
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <IonList key={id} onClick={handleSelect(suggestion)}>
          <IonItem> 
            <IonLabel>
          <b>{main_text}</b> <p>{secondary_text}</p>
          </IonLabel>
          </IonItem>
        </IonList>
      );
    });

  return (
    <div className="address-input-div" ref={ref}>
      <input
        className="address-input-field"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Request location..."
      />

      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <IonList className="address-list">{renderSuggestions()}</IonList>}
    </div>
  );
};

export default PlacesAutocomplete;
