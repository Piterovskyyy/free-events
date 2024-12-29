import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { BiCurrentLocation } from "react-icons/bi";

const GoogleMapAddress: React.FC = () => {
  const [center, setCenter] = useState({ lat: 50.2872, lng: 18.6762 }); // Domyślne współrzędne (San Francisco)
  const [place, setPlace] = useState(""); // Stan do trzymania adresu
  const [markerPosition, setMarkerPosition] = useState({ lat: 50.2872, lng: 18.6762 }); // Stan do trzymania pozycji markera

  const handleSearch = async () => {
    if (!place.trim()) {
      alert("Wprowadź miejsce");
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          place
        )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setCenter({ lat: location.lat, lng: location.lng });
        setMarkerPosition({ lat: location.lat, lng: location.lng });
        console.log(location)
      } else {
        alert("Nie znaleziono miejsca.");
      }
    } catch (error) {
      console.error("Błąd podczas wyszukiwania miejsca:", error);
      alert("Wystąpił błąd podczas wyszukiwania miejsca.");
    }
  };

  // Funkcja do obsługi kliknięcia na mapie i ustawiania markera
  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat() ?? 0;
    const lng = event.latLng?.lng() ?? 0;

    // Zmieniamy stan pozycji markera
    setMarkerPosition({ lat, lng });

    // Odwrotne geokodowanie (reverse geocoding)
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        // Ustawiamy adres w polu input
        setPlace(data.results[0].formatted_address);
      } else {
        alert("Nie znaleziono adresu.");
      }
    } catch (error) {
      console.error("Błąd podczas odwrotnego geokodowania:", error);
      alert("Wystąpił błąd podczas geokodowania.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10  ml-10 mr-10">
      <div className="flex items-center gap-2 mb-6">
        <BiCurrentLocation className="icon"/><input
          type="text"
          placeholder="Wprowadź adres"
          className="input input-bordered w-80"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Szukaj
        </button>
      </div>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px", borderRadius: ".5rem"}}
          center={center}
          zoom={18}
          onClick={handleMapClick} // Obsługuje kliknięcie na mapie
        >
          <Marker position={markerPosition} key={markerPosition.lat}/>
        </GoogleMap>
    </div>
  );
};

export default GoogleMapAddress;
