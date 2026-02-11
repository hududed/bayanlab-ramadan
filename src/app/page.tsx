"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { Masjid, Eatery, Market, PlaceType, ApiResponse } from "@/types";
import { MasjidCard, EateryCard, MarketCard } from "@/components/PlaceCard";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const REGIONS: Record<string, { label: string; lat: number; lon: number }> = {
  CO: { label: "Colorado", lat: 39.74, lon: -104.99 },
  TX: { label: "Texas", lat: 29.76, lon: -95.37 },
  NY: { label: "New York", lat: 40.71, lon: -74.01 },
  CA: { label: "California", lat: 34.05, lon: -118.24 },
  IL: { label: "Illinois", lat: 41.88, lon: -87.63 },
  FL: { label: "Florida", lat: 25.76, lon: -80.19 },
  NJ: { label: "New Jersey", lat: 40.74, lon: -74.17 },
  PA: { label: "Pennsylvania", lat: 39.95, lon: -75.17 },
  VA: { label: "Virginia", lat: 38.91, lon: -77.04 },
  MI: { label: "Michigan", lat: 42.33, lon: -83.05 },
  MA: { label: "Massachusetts", lat: 42.36, lon: -71.06 },
  GA: { label: "Georgia", lat: 33.75, lon: -84.39 },
  MD: { label: "Maryland", lat: 39.29, lon: -76.61 },
  OH: { label: "Ohio", lat: 39.96, lon: -82.99 },
  WA: { label: "Washington", lat: 47.61, lon: -122.33 },
  OR: { label: "Oregon", lat: 45.52, lon: -122.68 },
  MN: { label: "Minnesota", lat: 44.98, lon: -93.27 },
  NC: { label: "North Carolina", lat: 35.78, lon: -78.64 },
};

const TABS: { key: PlaceType; label: string; emoji: string }[] = [
  { key: "masajid", label: "Masajid", emoji: "🕌" },
  { key: "eateries", label: "Halal Eateries", emoji: "🍽️" },
  { key: "markets", label: "Halal Markets", emoji: "🛒" },
];

export default function Home() {
  const [region, setRegion] = useState("CO");
  const [activeTab, setActiveTab] = useState<PlaceType>("masajid");
  const [masajid, setMasajid] = useState<Masjid[]>([]);
  const [eateries, setEateries] = useState<Eatery[]>([]);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(true);

  const center: [number, number] = [
    REGIONS[region]?.lat ?? 39.74,
    REGIONS[region]?.lon ?? -104.99,
  ];

  const search = useCallback(async () => {
    setLoading(true);
    setSearched(true);
    try {
      const [mRes, eRes, kRes] = await Promise.all([
        fetch(`/api/masajid?region=${region}`),
        fetch(`/api/eateries?region=${region}`),
        fetch(`/api/markets?region=${region}`),
      ]);
      const [mData, eData, kData]: [
        ApiResponse<Masjid>,
        ApiResponse<Eatery>,
        ApiResponse<Market>,
      ] = await Promise.all([mRes.json(), eRes.json(), kRes.json()]);

      setMasajid(mData.items || []);
      setEateries(eData.items || []);
      setMarkets(kData.items || []);
    } catch {
      setMasajid([]);
      setEateries([]);
      setMarkets([]);
    } finally {
      setLoading(false);
    }
  }, [region]);

  useEffect(() => {
    search();
  }, [search]);

  const activeItems =
    activeTab === "masajid"
      ? masajid
      : activeTab === "eateries"
        ? eateries
        : markets;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-emerald-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">☪︎</span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Ramadan Finder</h1>
              <p className="text-emerald-200 text-sm">
                Find masajid, halal restaurants &amp; markets near you
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full sm:w-72 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {Object.entries(REGIONS).map(([code, { label }]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-6 w-full">
        {!searched ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">☪︎</p>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Ramadan Mubarak
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Select your state and search to find masajid, halal restaurants,
              and halal markets near you this Ramadan.
            </p>
            <p className="text-xs text-gray-400 mt-6 max-w-sm mx-auto italic">
              &ldquo;The example of those who spend in the way of Allah is like a
              seed of grain which grows seven spears; in each spear is a hundred
              grains.&rdquo;
              <span className="block mt-1 not-italic">— Quran 2:261</span>
            </p>
          </div>
        ) : (
          <>
            {/* Count badges */}
            <div className="flex gap-2 mb-4">
              {TABS.map(({ key, label, emoji }) => {
                const count =
                  key === "masajid"
                    ? masajid.length
                    : key === "eateries"
                      ? eateries.length
                      : markets.length;
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <span>{emoji}</span>
                    {label}
                    <span
                      className={`ml-1 text-xs ${
                        isActive ? "text-emerald-100" : "text-gray-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Map */}
            <Map
              masajid={masajid}
              eateries={eateries}
              markets={markets}
              activeTab={activeTab}
              center={center}
            />

            {/* Demo notice */}
            {activeItems.length > 0 && (
              <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 flex items-center justify-between">
                <p className="text-sm text-amber-800">
                  Showing {activeItems.length} results (demo preview)
                </p>
                <a
                  href="https://bayanlab.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-amber-900 bg-amber-200 hover:bg-amber-300 px-3 py-1 rounded-full transition-colors"
                >
                  Get full data →
                </a>
              </div>
            )}

            {/* Results list */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-32 rounded-xl bg-gray-100 animate-pulse"
                  />
                ))
              ) : activeItems.length === 0 ? (
                <div className="col-span-2 text-center py-12 text-gray-400">
                  No results found for this region.
                </div>
              ) : activeTab === "masajid" ? (
                masajid.map((m) => <MasjidCard key={m.masjid_id} item={m} />)
              ) : activeTab === "eateries" ? (
                eateries.map((e) => <EateryCard key={e.eatery_id} item={e} />)
              ) : (
                markets.map((m) => <MarketCard key={m.market_id} item={m} />)
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-gray-700">
                Powered by{" "}
                <a
                  href="https://bayanlab.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline font-semibold"
                >
                  BayanLab API
                </a>
              </span>
              <span className="text-gray-300">|</span>
              <a
                href="https://bayanlab.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600"
              >
                Docs
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="https://github.com/hududed/bayanlab-ramadan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600"
              >
                GitHub
              </a>
            </div>
            <p className="text-xs text-gray-400 italic text-center sm:text-right">
              Built with BayanLab API
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
