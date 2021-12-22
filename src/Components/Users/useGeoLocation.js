import React, { useEffect, useState } from "react";
import { alertServiceError } from "../Alert/AlertService";

const UseGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coords: { lat: "", lng: "" },
  });
  const onSuccess = (location) => {
    console.log(location);
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = () => {
    setLocation({
      loaded: true,
    });
    alertServiceError(
      "Geolocalizacion Bloqueada",
      "Por favor habilite la ubicacion de su dispositivo para continuar"
    );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default UseGeoLocation;
