import React, { useEffect, useState } from "react";

export default function AutoLocation() {
  const [status, setStatus] = useState("");
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      setStatus("Getting location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCoords({ lat, lon });
          setStatus("Location found!");

          // OPTIONAL: Send to backend
          fetch("/location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat, lon }),
          }).catch((err) => console.error("Error sending location:", err));
        },
        (error) => {
          setStatus("Error getting location: " + error.message);
        }
      );
    } else {
      setStatus("Geolocation is not supported by your browser.");
    }
  }, []); // Runs once when component loads

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Automatic Location Capture</h1>
      <p>{status}</p>
      {coords && (
        <p>
          Latitude: {coords.lat}, Longitude: {coords.lon}
        </p>
      )}
    </div>
  );
}
