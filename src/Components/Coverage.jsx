import React from "react";
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-neutral mb-12 text-center">
        {" "}
        All The Available Cities
      </h1>
      <div className="h-[800px] w-full">
        <MapContainer
          className="h-[800px] w-full"
          center={position}
          zoom={8}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {libraries.map((library) => (
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
