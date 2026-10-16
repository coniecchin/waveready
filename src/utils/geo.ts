import { Coordinates, LocationPreset } from '../types/beach';

export const LOCATION_PRESETS: LocationPreset[] = [
  {
    id: 'miami',
    name: 'Miami & Biscayne Bay',
    region: 'South Florida',
    coordinates: { lat: 25.7617, lng: -80.1918 },
  },
  {
    id: 'san-diego',
    name: 'San Diego & Point Loma',
    region: 'Southern California',
    coordinates: { lat: 32.7157, lng: -117.1611 },
  },
  {
    id: 'outer-banks',
    name: 'Cape Hatteras & Outer Banks',
    region: 'North Carolina',
    coordinates: { lat: 35.2443, lng: -75.5267 },
  },
  {
    id: 'oahu',
    name: 'Kailua & Honolulu',
    region: 'Oahu, Hawaii',
    coordinates: { lat: 21.3069, lng: -157.8583 },
  },
  {
    id: 'tampa-bay',
    name: 'Tampa Bay & St. Pete Beach',
    region: 'Gulf Coast, Florida',
    coordinates: { lat: 27.7676, lng: -82.6403 },
  },
  {
    id: 'destin',
    name: 'Destin Harbor & Emerald Coast',
    region: 'Florida Panhandle',
    coordinates: { lat: 30.3935, lng: -86.4958 },
  },
];

/**
 * Calculate distance in statute miles between two coordinate pairs using Haversine formula
 */
export function calculateDistanceMiles(coord1: Coordinates, coord2: Coordinates): number {
  const R = 3958.8; // Earth radius in statute miles
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function milesToKm(miles: number): number {
  return Math.round(miles * 1.60934 * 10) / 10;
}

export function ftToMeters(feet: number): number {
  return Math.round(feet * 0.3048 * 10) / 10;
}

export function fahrenheitToCelsius(f: number): number {
  return Math.round(((f - 32) * 5) / 9);
}

export function knotsToKmh(knots: number): number {
  return Math.round(knots * 1.852);
}

export function getWindRotationDeg(direction: string): number {
  const match = direction.match(/(\d+)°/);
  if (match) return parseInt(match[1], 10);
  
  const map: Record<string, number> = {
    N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
    E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
    S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
    W: 270, WNW: 292.5, NW: 315, NNW: 337.5,
  };
  const key = direction.trim().toUpperCase();
  return map[key] ?? 0;
}
