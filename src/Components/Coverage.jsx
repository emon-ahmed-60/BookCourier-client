import React from "react";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import UseAxios from "../Hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";

const Coverage = () => {
  const position = [23.685, 90.3563];

  const instance = UseAxios();
  const { data: libraries, isLoading } = useQuery({
    queryKey: ["libraries"],
    queryFn: async () => {
      const res = await instance.get("/libraries");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-12 text-center">
        {" "}
        All The Available Cities
      </h1>
      <div className="h-[800px] w-full">
        <MapContainer
          className="h-[800px] w-full z-1!"
          center={position}
          zoom={8}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {libraries?.map((library) => (
            <Marker
              key={library._id}
              position={[
                library.location.coordinates.lat,
                library.location.coordinates.lng,
              ]}
            >
              <Popup>
                <strong>{library.name}</strong>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
