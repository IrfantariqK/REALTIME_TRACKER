import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const Home: React.FC = () => {
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      leaflet.Icon.Default.imagePath = "/";
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "marker-icon.png",
        iconUrl: "marker-icon.png",
      });
      setL(leaflet);
    });
  }, []);

  useEffect(() => {
    if (L && typeof window !== "undefined") {
      if (!mapRef.current) {
        // Initialize the map
        mapRef.current = L.map("map").setView([0, 0], 16);

        // Add a tile layer to the map
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 100,
          attribution: "Karachi",
        }).addTo(mapRef.current!);
      }

      // Initialize socket connection
      socketRef.current = io("http://localhost:3000");

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            socketRef.current?.emit("send-location", { latitude, longitude });

            // Update map view to current location
            mapRef.current!.setView([latitude, longitude], 16);

            // Optionally, you can add a marker to the current location
            L.marker([latitude, longitude]).addTo(mapRef.current!);
          },
          (error) => {
            console.error(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      }

      socketRef.current.on(
        "receive-location",
        (data: { id: string; latitude: number; longitude: number }) => {
          const { id, latitude, longitude } = data;
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude]);
            if (markersRef.current[id]) {
              markersRef.current[id].setLatLng([latitude, longitude]);
            } else {
              markersRef.current[id] = L.marker([latitude, longitude]).addTo(
                mapRef.current
              );
            }
          }
        }
      );

      socketRef.current.on("user-disconnected", (id: string) => {
        if (mapRef.current && markersRef.current[id]) {
          mapRef.current.removeLayer(markersRef.current[id]);
          delete markersRef.current[id];
        }
      });

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [L]);

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default Home;
