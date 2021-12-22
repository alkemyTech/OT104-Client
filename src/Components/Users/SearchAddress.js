import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const SearchAddress = () => {
  const api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {}, [coordinates]);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log(latLng);
    setAddress(value);
    setCoordinates(latLng);
  };
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Form.Label> Ingresar Ubicación</Form.Label>
            <Form.Control
              {...getInputProps({ placeholder: "Ingresa tu Ubicacion" })}
            />

            <div>
              {loading ? <div>...cargando</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {coordinates.lat ? (
        <>
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=14&size=400x300&sensor=false&markers=color:blue%7C${coordinates.lat},${coordinates.lng}&key=${api_key}`}
            alt=""
          />
        </>
      ) : null}
    </div>
  );
};

export default SearchAddress;
