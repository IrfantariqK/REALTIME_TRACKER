import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import L from "leaflet";

const Home: React.FC = () => {
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        // Dynamic import of leaflet to prevent SSR issues
        const leaflet = await import("leaflet");
        leaflet.Icon.Default.imagePath = "/";
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: "marker-icon.png",
          iconUrl: "marker-icon.png",
        });
        setIsLeafletLoaded(true);
      } catch (error) {
        console.error("Failed to load Leaflet", error);
      }
    };

    loadLeaflet();
  }, []);

  useEffect(() => {
    if (isLeafletLoaded && typeof window !== "undefined") {
      if (!mapRef.current) {
        // Initialize the map
        mapRef.current = L.map("map").setView([0, 0], 2);

        // Add a tile layer to the map
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors',
        }).addTo(mapRef.current!);
      }

      // Initialize socket connection
      socketRef.current = io("http://localhost:3000");

      if (navigator.geolocation) {
        const success = (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          socketRef.current?.emit("send-location", { latitude, longitude });

          // Update map view to current location
          mapRef.current!.setView([latitude, longitude], 16);

          // Add a marker to the current location
          if (!markersRef.current["current-location"]) {
            markersRef.current["current-location"] = L.marker([latitude, longitude]).addTo(
              mapRef.current!
            );
          } else {
            markersRef.current["current-location"].setLatLng([latitude, longitude]);
          }
        };

        const error = (error: GeolocationPositionError) => {
          console.error("Geolocation error:", error);
        };

        navigator.geolocation.watchPosition(success, error, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      }

      socketRef.current.on(
        "receive-location",
        (data: { id: string; latitude: number; longitude: number }) => {
          const { id, latitude, longitude } = data;
          if (mapRef.current) {
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
  }, [isLeafletLoaded]);

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default Home;
