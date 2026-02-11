export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Masjid {
  masjid_id: string;
  name: string;
  address: Address;
  latitude: number | null;
  longitude: number | null;
  phone: string;
  website: string;
  email: string;
  denomination: string;
  languages: string;
  has_womens_section: boolean;
  has_parking: boolean;
  has_wudu_facilities: boolean;
  offers_jumah: boolean;
  offers_daily_prayers: boolean;
  offers_quran_classes: boolean;
  offers_weekend_school: boolean;
}

export interface Eatery {
  eatery_id: string;
  name: string;
  cuisine_style: string;
  address: Address;
  latitude: number | null;
  longitude: number | null;
  phone: string;
  website: string;
  hours_raw: string;
  google_rating: number | null;
  halal_status: string;
  is_favorite: boolean;
  is_food_truck: boolean;
}

export interface Market {
  market_id: string;
  name: string;
  category: string;
  address: Address;
  latitude: number | null;
  longitude: number | null;
  phone: string;
  website: string;
  hours_raw: string;
  google_rating: number | null;
  halal_status: string;
  has_butcher: boolean;
  has_deli: boolean;
}

export type PlaceType = "masajid" | "eateries" | "markets";

export interface ApiResponse<T> {
  version: string;
  region: string;
  access_tier?: string;
  items: T[];
}
