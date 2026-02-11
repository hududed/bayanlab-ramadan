"use client";

import { useEffect, useState } from "react";
import { Masjid, Eatery, Market, PlaceType } from "@/types";

interface MapPin {
  name: string;
  city: string;
  lat: number;
  lon: number;
}

interface MapProps {
  masajid: Masjid[];
  eateries: Eatery[];
  markets: Market[];
  activeTab: PlaceType;
  center: [number, number];
}

function toPin(item: { name: string; address: { city: string }; latitude: number | null; longitude: number | null }): MapPin | null {
  if (!item.latitude || !item.longitude) return null;
  return { name: item.name, city: item.address?.city ?? "", lat: item.latitude, lon: item.longitude };
}

export default function Map({ masajid, eateries, markets, activeTab, center }: MapProps) {
  const [loaded, setLoaded] = useState(false);
  const [comps, setComps] = useState<{
    MapContainer: typeof import("react-leaflet").MapContainer;
    TileLayer: typeof import("react-leaflet").TileLayer;
    Marker: typeof import("react-leaflet").Marker;
    Popup: typeof import("react-leaflet").Popup;
    useMap: typeof import("react-leaflet").useMap;
    L: typeof import("leaflet");
  } | null>(null);

  useEffect(() => {
    Promise.all([
      import("react-leaflet"),
      import("leaflet"),
    ]).then(([rl, L]) => {
      // Inject leaflet CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
      setComps({
        MapContainer: rl.MapContainer,
        TileLayer: rl.TileLayer,
        Marker: rl.Marker,
        Popup: rl.Popup,
        useMap: rl.useMap,
        L: L.default,
      });
      setLoaded(true);
    });
  }, []);

  if (!loaded || !comps) {
    return (
      <div className="w-full h-[400px] rounded-xl bg-gray-100 animate-pulse flex items-center justify-center">
        <span className="text-gray-400">Loading map...</span>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, L } = comps;

  const createIcon = (emoji: string, bg: string) =>
    L.divIcon({
      html: `<div style="background:${bg};width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid white"><span style="font-size:18px">${emoji}</span></div>`,
      className: "",
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });

  const icons = {
    masajid: createIcon("🕌", "#059669"),
    eateries: createIcon("🍽️", "#ea580c"),
    markets: createIcon("🛒", "#7c3aed"),
  };

  let pins: MapPin[] = [];
  let icon = icons.masajid;

  if (activeTab === "masajid") {
    pins = masajid.map(toPin).filter((p): p is MapPin => p !== null);
    icon = icons.masajid;
  } else if (activeTab === "eateries") {
    pins = eateries.map(toPin).filter((p): p is MapPin => p !== null);
    icon = icons.eateries;
  } else {
    pins = markets.map(toPin).filter((p): p is MapPin => p !== null);
    icon = icons.markets;
  }

  return (
    <MapContainer
      center={center}
      zoom={11}
      className="w-full h-[400px] rounded-xl z-0"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap center={center} useMap={comps.useMap} />
      {pins.map((pin, i) => (
        <Marker key={`${pin.name}-${i}`} position={[pin.lat, pin.lon]} icon={icon}>
          <Popup>
            <strong>{pin.name}</strong>
            <br />
            <span className="text-gray-500">{pin.city}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function RecenterMap({
  center,
  useMap,
}: {
  center: [number, number];
  useMap: typeof import("react-leaflet").useMap;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 11);
  }, [center, map]);
  return null;
}
