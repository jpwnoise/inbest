import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importa los estilos de Leaflet
import L from "leaflet";
import './Map.component.sass'

// 🔹 Solucionar el problema de los íconos en Leaflet
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto de anclaje
  popupAnchor: [1, -34], // Posición del popup respecto al ícono
});

// 🔄 **Componente que mueve el mapa cuando cambia `launchpad`**
const MapUpdater: React.FC<{ latitude: number; longitude: number }> = ({ latitude, longitude }) => {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.flyTo([latitude, longitude], 10, { animate: true }); // 🔹 Mueve el mapa suavemente
    }
  }, [latitude, longitude, map]);

  return null;
};

// 📍 **Interfaz para los props**
interface Location {
  launchpad: any;
  launch:any
  rocket:any
}

const MapComponent: React.FC<Location> = ({ launchpad, launch, rocket }) => {
  if (!launchpad) {
    return <p>Cargando ubicación del lanzamiento...</p>; // Mensaje de carga
  }

  return (
    <div style={{ height: "100%" }}>
      <MapContainer
        center={[launchpad.latitude, launchpad.longitude]}
        zoom={5}
        style={{ height: "500px", width: "100%" }}
        attributionControl={true} // ✅ Agregar aquí el control de atribución
      >
        {/* 🔄 Mueve el mapa cuando cambia `launchpad` */}
        <MapUpdater latitude={launchpad.latitude} longitude={launchpad.longitude} />

        {/* 🌍 Capa base del mapa */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 📍 Marcador en el mapa */}
        <Marker position={[launchpad.latitude, launchpad.longitude]} icon={markerIcon}>
          <Popup>📍 {launchpad.full_name}</Popup>
        </Marker>
      </MapContainer>

      {/* 🔹 Datos sobre el lanzamiento */}
      <div className="highData">
        <p>
          <strong>Nombre:</strong> {launch.name} <br/>
          <strong>Tipo cohete:</strong> {rocket.name} <br/>
        </p>
      </div> 

      {/* 🔹 Datos sobre el lanzamiento */}
      <div className="lowData"    >
        <p>
          <strong>Localidad:</strong> {launchpad.locality} <br />
          <strong>Nombre completo:</strong> {launchpad.full_name}
        </p>
      </div> 

    </div>
  );
};

export default MapComponent;
