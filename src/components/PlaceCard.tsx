"use client";

import { Masjid, Eatery, Market } from "@/types";

function formatAddress(addr: { street?: string; city: string; state: string; zip?: string }) {
  const parts = [addr.street, addr.city, addr.state].filter(Boolean);
  return parts.join(", ");
}

export function MasjidCard({ item }: { item: Masjid }) {
  const tags: string[] = [];
  if (item.offers_jumah) tags.push("Jumu'ah");
  if (item.offers_daily_prayers) tags.push("Daily Salah");
  if (item.has_womens_section) tags.push("Women's Section");
  if (item.offers_quran_classes) tags.push("Quran Classes");
  if (item.offers_weekend_school) tags.push("Weekend School");
  if (item.has_parking) tags.push("Parking");

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{formatAddress(item.address)}</p>
        </div>
        <span className="shrink-0 text-2xl" aria-hidden>🕌</span>
      </div>
      {item.denomination && (
        <p className="text-xs text-gray-400 mt-1">{item.denomination}</p>
      )}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map((t) => (
            <span key={t} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
              {t}
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-3 mt-3">
        {item.phone && (
          <a href={`tel:${item.phone}`} className="text-xs text-emerald-600 hover:underline">Call</a>
        )}
        {item.website && (
          <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline">Website</a>
        )}
      </div>
    </div>
  );
}

export function EateryCard({ item }: { item: Eatery }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{formatAddress(item.address)}</p>
        </div>
        <span className="shrink-0 text-2xl" aria-hidden>🍽️</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {item.cuisine_style && (
          <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">{item.cuisine_style}</span>
        )}
        {item.google_rating && (
          <span className="text-xs text-gray-500">★ {item.google_rating}</span>
        )}
        {item.halal_status && (
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            item.halal_status === "validated" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
          }`}>
            {item.halal_status === "validated" ? "Halal Verified" : item.halal_status}
          </span>
        )}
        {item.is_food_truck && (
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">Food Truck</span>
        )}
      </div>
      {item.hours_raw && (
        <p className="text-xs text-gray-400 mt-2">{item.hours_raw}</p>
      )}
      <div className="flex gap-3 mt-3">
        {item.phone && (
          <a href={`tel:${item.phone}`} className="text-xs text-emerald-600 hover:underline">Call</a>
        )}
        {item.website && (
          <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline">Website</a>
        )}
      </div>
    </div>
  );
}

export function MarketCard({ item }: { item: Market }) {
  const tags: string[] = [];
  if (item.has_butcher) tags.push("Butcher");
  if (item.has_deli) tags.push("Deli");
  if (item.category) tags.push(item.category);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{formatAddress(item.address)}</p>
        </div>
        <span className="shrink-0 text-2xl" aria-hidden>🛒</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {tags.map((t) => (
          <span key={t} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{t}</span>
        ))}
        {item.google_rating && (
          <span className="text-xs text-gray-500">★ {item.google_rating}</span>
        )}
      </div>
      {item.hours_raw && (
        <p className="text-xs text-gray-400 mt-2">{item.hours_raw}</p>
      )}
      <div className="flex gap-3 mt-3">
        {item.phone && (
          <a href={`tel:${item.phone}`} className="text-xs text-emerald-600 hover:underline">Call</a>
        )}
        {item.website && (
          <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline">Website</a>
        )}
      </div>
    </div>
  );
}
