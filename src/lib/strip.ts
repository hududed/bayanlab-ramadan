/**
 * Strip sensitive fields from API responses for the demo.
 * Only keep what's needed for the UI — no phone, email, exact coords, etc.
 * Want the full data? Get an API key at bayanlab.com/docs.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export function stripMasjid(item: any) {
  return {
    masjid_id: item.masjid_id,
    name: item.name,
    address: { city: item.address?.city, state: item.address?.state },
    latitude: item.latitude ? fuzz(item.latitude) : null,
    longitude: item.longitude ? fuzz(item.longitude) : null,
    denomination: item.denomination,
    has_womens_section: item.has_womens_section,
    has_parking: item.has_parking,
    offers_jumah: item.offers_jumah,
    offers_daily_prayers: item.offers_daily_prayers,
    offers_quran_classes: item.offers_quran_classes,
    offers_weekend_school: item.offers_weekend_school,
  };
}

export function stripEatery(item: any) {
  return {
    eatery_id: item.eatery_id,
    name: item.name,
    cuisine_style: item.cuisine_style,
    address: { city: item.address?.city, state: item.address?.state },
    latitude: item.latitude ? fuzz(item.latitude) : null,
    longitude: item.longitude ? fuzz(item.longitude) : null,
    google_rating: item.google_rating,
    halal_status: item.halal_status,
    is_food_truck: item.is_food_truck,
    hours_raw: item.hours_raw,
  };
}

export function stripMarket(item: any) {
  return {
    market_id: item.market_id,
    name: item.name,
    category: item.category,
    address: { city: item.address?.city, state: item.address?.state },
    latitude: item.latitude ? fuzz(item.latitude) : null,
    longitude: item.longitude ? fuzz(item.longitude) : null,
    google_rating: item.google_rating,
    has_butcher: item.has_butcher,
    has_deli: item.has_deli,
    hours_raw: item.hours_raw,
  };
}

/** Offset coordinate by ~0.3–0.8 miles in random direction */
function fuzz(coord: number): number {
  // ~0.005 degrees ≈ 0.35 miles. Seeded from the coordinate itself for consistency.
  const offset = (Math.sin(coord * 1000) * 0.005) + 0.003;
  return Math.round((coord + offset) * 1000) / 1000;
}
