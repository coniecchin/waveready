export type Activity = 
  | 'surfing' 
  | 'kitesurfing' 
  | 'fishing_charter' 
  | 'kayak_sup' 
  | 'snorkeling_diving' 
  | 'boat_launch' 
  | 'windsurfing';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface HourlyForecast {
  time: string;
  waveFt: number;
  windKts: number;
  tideFt: number;
  windDir: string;
  condition: string;
}

export interface HazardAlert {
  type: 'rip_current' | 'small_craft' | 'marine_life' | 'rocky_shelf' | 'strong_current' | 'none';
  label: string;
  severity: 'low' | 'moderate' | 'high';
}

export interface CharterVessel {
  id: string;
  name: string;
  captain: string;
  boatName: string;
  boatLengthFt: number;
  boatType: string;
  targetSpecies: string[];
  halfDayRate: number;
  fullDayRate: number;
  rating: number;
  reviewCount: number;
  phone: string;
  email: string;
  dockLocation: string;
  description: string;
}

export interface FishingData {
  boatRampAvailable: boolean;
  rampType: string;
  lanes: number;
  maxVesselLengthFt: number;
  marinaName?: string;
  slipsCount?: number;
  fuelDock: boolean;
  liveBaitShop: boolean;
  fishCleaningTable: boolean;
  rampFee: string;
  seasonalTargetSpecies: string[];
  activeCharters: CharterVessel[];
}

export interface BeachAmenities {
  parkingSpots: number;
  parkingFee: string;
  lifeguardOnDuty: boolean;
  restroomsShowers: boolean;
  rentalGearShop: boolean;
  dogFriendly: boolean;
  accessType: 'Direct Drive-on' | 'Paved Lot to Boardwalk' | 'Cliffside Trail' | 'Marina Pier';
}

export interface SuitabilityDetail {
  score: number; // 0 - 100
  level: 'Optimal' | 'Good' | 'Fair' | 'Challenging';
  reason: string;
}

export interface BeachConditions {
  waveHeightFt: number;
  wavePeriodSec: number;
  swellDirection: string;
  windSpeedKts: number;
  windDirection: string;
  windType: 'Offshore' | 'Cross-shore' | 'Onshore' | 'Light & Variable';
  tideStatus: 'Rising' | 'Falling' | 'High' | 'Low';
  tideHeightFt: number;
  nextTide: string;
  waterTempF: number;
  waterVisibilityFt: number;
  hazards: HazardAlert[];
  hourlyForecast: HourlyForecast[];
}

export interface Beach {
  id: string;
  name: string;
  region: string;
  stateCountry: string;
  coordinates: Coordinates;
  image: string;
  distanceMiles?: number;
  activities: Activity[];
  suitability: Partial<Record<Activity, SuitabilityDetail>>;
  conditions: BeachConditions;
  fishingData: FishingData;
  amenities: BeachAmenities;
  breakType: 'Beach Break' | 'Reef Break' | 'Point Break' | 'Sheltered Lagoon' | 'Inlet Channel';
  description: string;
  insiderTip: string;
}

export interface LocationPreset {
  id: string;
  name: string;
  region: string;
  coordinates: Coordinates;
}
