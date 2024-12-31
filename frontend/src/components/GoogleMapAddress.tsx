import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { BiCurrentLocation } from "react-icons/bi";
interface GoogleMapAddressProps {
  setLocation?: (location: string) => void | undefined;
  location: string;
}

const GoogleMapAddress: React.FC<GoogleMapAddressProps> = ({
  setLocation,
  location,
}) => {
  const [center, setCenter] = useState({ lat: 50.2872, lng: 18.6762 });
  const [markerPosition, setMarkerPosition] = useState({
    lat: 50.2872,
    lng: 18.6762,
  });

  useEffect(() => {
    if (setLocation) return;
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location
          )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setCenter({ lat: location.lat, lng: location.lng });
          setMarkerPosition({ lat: location.lat, lng: location.lng });
        } else {
          alert("Nie znaleziono miejsca.");
        }
      } catch (error) {
        console.error("Błąd podczas wyszukiwania miejsca:", error);
        alert("Wystąpił błąd podczas wyszukiwania miejsca.");
      }
    };
    fetchLocation();
  }, [location, setLocation]);

  const handleSearch = async () => {
    if (!location.trim()) {
      alert("Wprowadź miejsce");
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCenter({ lat: location.lat, lng: location.lng });
        setMarkerPosition({ lat: location.lat, lng: location.lng });
        if (setLocation) {
          setLocation(data.results[0].formatted_address);
        }
      } else {
        alert("Nie znaleziono miejsca.");
      }
    } catch (error) {
      console.error("Błąd podczas wyszukiwania miejsca:", error);
      alert("Wystąpił błąd podczas wyszukiwania miejsca.");
    }
  };
  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (!setLocation) return;
    const lat = event.latLng?.lat() ?? 0;
    const lng = event.latLng?.lng() ?? 0;

    setMarkerPosition({ lat, lng });

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0 && setLocation) {
        setLocation(data.results[0].formatted_address);
      } else {
        alert("Nie znaleziono adresu.");
      }
    } catch (error) {
      console.error("Błąd podczas odwrotnego geokodowania:", error);
      alert("Wystąpił błąd podczas geokodowania.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      {setLocation && (
        <div className="flex items-center gap-2 mb-6">
          <BiCurrentLocation className="icon" />
          <input
            type="text"
            placeholder="Wprowadź adres"
            className="input input-bordered w-80"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Szukaj
          </button>
        </div>
      )}
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
          borderRadius: ".5rem",
        }}
        center={center}
        zoom={18}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} key={markerPosition.lat} />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapAddress;
