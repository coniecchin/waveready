import { Beach } from '../types/beach';

import heroImg from '../assets/images/waveready_coastal_hero_1792134899158.jpg';
import surfImg from '../assets/images/beach_spot_surf_break_1792134899317.jpg';
import charterImg from '../assets/images/fishing_charter_boat_1792134901038.jpg';
import bayImg from '../assets/images/kitesurf_coastal_bay_1792134900498.jpg';

export const INITIAL_BEACHES: Beach[] = [
  {
    id: 'east-coast-park-beach',
    name: 'East Coast Park (ECP) Beach & Coastal Lagoon',
    region: 'East Coast (Area E & F)',
    stateCountry: 'Singapore (OneMap & NEA Live)',
    coordinates: { lat: 1.3048, lng: 103.9240 },
    image: bayImg,
    breakType: 'Beach Break',
    activities: ['kitesurfing', 'windsurfing', 'kayak_sup', 'fishing_charter', 'boat_launch'],
    suitability: {
      kitesurfing: {
        score: 92,
        level: 'Optimal',
        reason: 'Reliable northeast monsoon sea breezes; dedicated water sports lagoon and wide launching coastline.'
      },
      windsurfing: {
        score: 90,
        level: 'Optimal',
        reason: 'Constant cross-shore winds along Area E with specialized rental centers and equipment storage.'
      },
      kayak_sup: {
        score: 86,
        level: 'Good',
        reason: 'Sheltered breakwaters provide calm paddle zones outside commercial shipping lanes.'
      },
      fishing_charter: {
        score: 88,
        level: 'Good',
        reason: 'Direct access to Southern Strait and Eastern Anchorage pelagic grounds and Bedok Jetty shore casting.'
      },
      boat_launch: {
        score: 85,
        level: 'Good',
        reason: 'Dual-lane public trailer launch facility at NSRCC / Marina South passage.'
      }
    },
    conditions: {
      waveHeightFt: 1.8,
      wavePeriodSec: 7,
      swellDirection: 'SE 140°',
      windSpeedKts: 11,
      windDirection: 'NE 45°',
      windType: 'Cross-shore',
      tideStatus: 'Rising',
      tideHeightFt: 2.5,
      nextTide: 'High 2.80m (NEA Live)',
      waterTempF: 84,
      waterVisibilityFt: 20,
      hazards: [
        { type: 'none', label: 'Monitor NEA UV and Heat Stress indices during afternoon sessions', severity: 'low' }
      ],
      hourlyForecast: [
        { time: '07:00', waveFt: 1.2, windKts: 8, tideFt: 1.8, windDir: 'NE', condition: 'Calm Glass' },
        { time: '10:00', waveFt: 1.5, windKts: 10, tideFt: 2.2, windDir: 'ENE', condition: 'Fresh Breeze' },
        { time: '13:00', waveFt: 1.8, windKts: 12, tideFt: 2.5, windDir: 'NE', condition: 'Moderate Sea' },
        { time: '16:00', waveFt: 1.9, windKts: 13, tideFt: 2.6, windDir: 'NE', condition: 'Brisk Glides' },
        { time: '19:00', waveFt: 1.4, windKts: 9, tideFt: 2.1, windDir: 'ENE', condition: 'Sunset Cruise' },
      ]
    },
    fishingData: {
      boatRampAvailable: true,
      rampType: 'Concrete Dual-Lane Coastal Ramp',
      lanes: 2,
      maxVesselLengthFt: 32,
      marinaName: 'Marina South & East Coast Maritime Hub',
      slipsCount: 45,
      fuelDock: true,
      liveBaitShop: true,
      fishCleaningTable: true,
      rampFee: 'S$15 / launch (Public Access)',
      seasonalTargetSpecies: ['Barramundi (Kerapu)', 'Queenfish', 'Spanish Mackerel (Tenggiri)', 'Trevally', 'Mangrove Jack', 'Snapper'],
      activeCharters: [
        {
          id: 'sg-ch-01',
          name: 'Singapore Southern Strait Sportfishing',
          captain: 'Capt. Kenneth Tan',
          boatName: 'Strait Hunter 32',
          boatLengthFt: 32,
          boatType: 'Center Console Twin Yamaha 250s',
          targetSpecies: ['Barramundi', 'Spanish Mackerel', 'Giant Trevally'],
          halfDayRate: 650,
          fullDayRate: 1100,
          rating: 4.9,
          reviewCount: 96,
          phone: '+65 9123 4567',
          email: 'capt.kenneth@sgstraitcharters.com',
          dockLocation: 'Marina South Pier / East Coast Berth 4',
          description: 'Specializes in jigging, popping, and live-prawn drift fishing around Singapore Southern Strait reefs and wrecks.'
        }
      ]
    },
    amenities: {
      parkingSpots: 800,
      parkingFee: 'S$0.60 / 30 mins (HDB/URA Electronic Parking)',
      lifeguardOnDuty: true,
      restroomsShowers: true,
      rentalGearShop: true,
      dogFriendly: true,
      accessType: 'Paved Lot to Boardwalk'
    },
    description: 'Singapore’s premier coastal recreation belt spanning 15 kilometers with dedicated water sports centers, sailing clubs, and direct boat ramp access.',
    insiderTip: 'Check the NEA live UV and Heat Stress (WBGT) reading on this page before launching midday paddleboards or kites.'
  },
  {
    id: 'sentosa-siloso-tanjong',
    name: 'Sentosa Island (Siloso & Tanjong Beach)',
    region: 'Sentosa Southern Coast',
    stateCountry: 'Singapore (OneMap & NEA Live)',
    coordinates: { lat: 1.2504, lng: 103.8275 },
    image: heroImg,
    breakType: 'Sheltered Lagoon',
    activities: ['kayak_sup', 'snorkeling_diving', 'surfing', 'fishing_charter'],
    suitability: {
      kayak_sup: {
        score: 95,
        level: 'Optimal',
        reason: 'Protected tropical lagoons surrounded by palm fringed islets; safe for all experience levels.'
      },
      snorkeling_diving: {
        score: 82,
        level: 'Good',
        reason: 'Artificial reef modules and rocky breakwater groynes host tropical reef fish and sea anemones.'
      },
      surfing: {
        score: 75,
        level: 'Fair',
        reason: 'Wave House flowriding and seasonal gentle ocean swells during high spring tides.'
      },
      fishing_charter: {
        score: 94,
        level: 'Optimal',
        reason: 'ONE°15 Marina Sentosa Cove provides world-class yacht and sportfishing charter berths.'
      }
    },
    conditions: {
      waveHeightFt: 1.5,
      wavePeriodSec: 6,
      swellDirection: 'S 175°',
      windSpeedKts: 9,
      windDirection: 'NE 40°',
      windType: 'Offshore',
      tideStatus: 'Rising',
      tideHeightFt: 2.4,
      nextTide: 'High 2.65m (NEA Live)',
      waterTempF: 85,
      waterVisibilityFt: 25,
      hazards: [
        { type: 'none', label: 'Follow marked swimming lagoon zones away from shipping fairways', severity: 'low' }
      ],
      hourlyForecast: [
        { time: '07:00', waveFt: 1.0, windKts: 7, tideFt: 1.6, windDir: 'NE', condition: 'Mirror Glass' },
        { time: '10:00', waveFt: 1.3, windKts: 9, tideFt: 2.1, windDir: 'NE', condition: 'Smooth Lagoon' },
        { time: '13:00', waveFt: 1.6, windKts: 11, tideFt: 2.5, windDir: 'ENE', condition: 'Warm Sun' },
        { time: '16:00', waveFt: 1.5, windKts: 10, tideFt: 2.4, windDir: 'NE', condition: 'Pleasant Glides' },
        { time: '19:00', waveFt: 1.1, windKts: 7, tideFt: 1.9, windDir: 'NE', condition: 'Sunset Calm' },
      ]
    },
    fishingData: {
      boatRampAvailable: true,
      rampType: 'ONE°15 Marina Sentosa Cove Full Service Travelift & Slips',
      lanes: 4,
      maxVesselLengthFt: 80,
      marinaName: 'ONE°15 Marina Sentosa Cove',
      slipsCount: 270,
      fuelDock: true,
      liveBaitShop: true,
      fishCleaningTable: true,
      rampFee: 'ONE°15 Marina Berthing Fees Apply',
      seasonalTargetSpecies: ['Giant Trevally', 'Cobia', 'Sailfish (Horsburgh Grounds)', 'Red Snapper', 'Coral Trout'],
      activeCharters: [
        {
          id: 'sg-ch-02',
          name: 'Sentosa Cove Offshore Gamefishing',
          captain: 'Capt. Daniel Yeo',
          boatName: 'Equator Blue 46',
          boatLengthFt: 46,
          boatType: 'Riviera Flybridge Sportfisher',
          targetSpecies: ['Giant Trevally', 'Cobia', 'Mahi-Mahi', 'Sailfish'],
          halfDayRate: 950,
          fullDayRate: 1650,
          rating: 5.0,
          reviewCount: 142,
          phone: '+65 9876 5432',
          email: 'daniel@sentosacovecharters.com',
          dockLocation: 'Superyacht Berth C-08, ONE°15 Marina Sentosa Cove',
          description: 'Expeditions to Horsburgh Lighthouse, Tioman drop-offs, and Lazarus Island with top-tier Shimano Stella tackle.'
        }
      ]
    },
    amenities: {
      parkingSpots: 550,
      parkingFee: 'S$2.40 / hr (Sentosa Cove & Beach Gantry)',
      lifeguardOnDuty: true,
      restroomsShowers: true,
      rentalGearShop: true,
      dogFriendly: true,
      accessType: 'Paved Lot to Boardwalk'
    },
    description: 'Singapore’s resort island featuring white sand lagoons, calm turquoise coves, and the premier international marina gateway to the Southern Islands.',
    insiderTip: 'Launch kayaks from Tanjong Beach early morning for crystal clear waters around the outer coral reef barriers.'
  },
  {
    id: 'changi-beach-park',
    name: 'Changi Beach & Pulau Ubin Gateway',
    region: 'Changi Coastal Point',
    stateCountry: 'Singapore (OneMap & NEA Live)',
    coordinates: { lat: 1.3914, lng: 103.9926 },
    image: charterImg,
    breakType: 'Inlet Channel',
    activities: ['fishing_charter', 'boat_launch', 'kayak_sup'],
    suitability: {
      fishing_charter: {
        score: 95,
        level: 'Optimal',
        reason: 'Fastest water access to eastern fish-rich kelongs, Pulau Ubin channels, and Johor Strait dropoffs.'
      },
      boat_launch: {
        score: 93,
        level: 'Optimal',
        reason: 'Changi Point concrete slipway and SAF Yacht Club ramps with fuel and ice facilities.'
      },
      kayak_sup: {
        score: 87,
        level: 'Good',
        reason: 'Scenic mangrove and coastal paddle trails connecting Changi Point to Chek Jawa Wetlands.'
      }
    },
    conditions: {
      waveHeightFt: 1.4,
      wavePeriodSec: 5,
      swellDirection: 'NE 50°',
      windSpeedKts: 10,
      windDirection: 'NE 45°',
      windType: 'Onshore',
      tideStatus: 'Rising',
      tideHeightFt: 2.6,
      nextTide: 'High 2.75m (NEA Live)',
      waterTempF: 84,
      waterVisibilityFt: 18,
      hazards: [
        { type: 'strong_current', label: 'Watch for ferry wake in Serangoon Harbour channel', severity: 'moderate' }
      ],
      hourlyForecast: [
        { time: '07:00', waveFt: 1.0, windKts: 7, tideFt: 1.8, windDir: 'NE', condition: 'Calm Channel' },
        { time: '10:00', waveFt: 1.2, windKts: 9, tideFt: 2.2, windDir: 'NE', condition: 'Light Wavelets' },
        { time: '13:00', waveFt: 1.5, windKts: 11, tideFt: 2.6, windDir: 'NE', condition: 'Breezy Tide' },
        { time: '16:00', waveFt: 1.6, windKts: 11, tideFt: 2.7, windDir: 'ENE', condition: 'Moderate Swell' },
        { time: '19:00', waveFt: 1.2, windKts: 8, tideFt: 2.0, windDir: 'NE', condition: 'Twilight Calm' },
      ]
    },
    fishingData: {
      boatRampAvailable: true,
      rampType: 'Concrete Slipway & Jetty at Changi Point',
      lanes: 2,
      maxVesselLengthFt: 35,
      marinaName: 'Changi Point Coastal Terminal',
      slipsCount: 30,
      fuelDock: true,
      liveBaitShop: true,
      fishCleaningTable: true,
      rampFee: 'Free Public Slipway / Wharfage fees apply',
      seasonalTargetSpecies: ['Barramundi', 'Mangrove Snapper', 'Threadfin (Ngoh Heur)', 'Diamond Trevally', 'Grouper'],
      activeCharters: [
        {
          id: 'sg-ch-03',
          name: 'Eastern Straits & Kelong Charters',
          captain: 'Capt. Ah Seng & Crew',
          boatName: 'Changi Corsair 28',
          boatLengthFt: 28,
          boatType: 'Custom Fibreglass Kelong Runner',
          targetSpecies: ['Barramundi', 'Threadfin', 'Mangrove Snapper'],
          halfDayRate: 480,
          fullDayRate: 850,
          rating: 4.8,
          reviewCount: 79,
          phone: '+65 9234 5678',
          email: 'ahseng@changifishing.sg',
          dockLocation: 'Changi Point Ferry Terminal Slip 3',
          description: 'Authentic Singapore kelong and offshore estuary fishing with live Tamban and prawn bait provided.'
        }
      ]
    },
    amenities: {
      parkingSpots: 350,
      parkingFee: 'S$0.60 / 30 mins',
      lifeguardOnDuty: false,
      restroomsShowers: true,
      rentalGearShop: true,
      dogFriendly: true,
      accessType: 'Paved Lot to Boardwalk'
    },
    description: 'Historic pristine stretch on the northeastern tip of Singapore looking out across the Johor Strait to Pulau Ubin and Tekong.',
    insiderTip: 'Catch live bait right along the rocky groynes before embarking into the deep channel.'
  },
  {
    id: 'haulover-inlet-marina',
    name: 'Haulover Inlet & Marina Beach',
    region: 'North Miami Beach',
    stateCountry: 'Florida, USA',
    coordinates: { lat: 25.9038, lng: -80.1228 },
    image: charterImg,
    breakType: 'Inlet Channel',
    activities: ['fishing_charter', 'boat_launch', 'kitesurfing', 'kayak_sup'],
    suitability: {
      fishing_charter: {
        score: 96,
        level: 'Optimal',
        reason: 'Direct deep-water Atlantic inlet with 0 bridge restrictions; prime blue-water pelagic charter fleet.'
      },
      boat_launch: {
        score: 94,
        level: 'Optimal',
        reason: '6-lane oversized concrete ramp with 24/7 attendant, staging docks, and deep low-tide draft.'
      },
      kitesurfing: {
        score: 82,
        level: 'Good',
        reason: 'Reliable coastal sea breeze along the north ocean jetty; wide launch strip.'
      },
      kayak_sup: {
        score: 74,
        level: 'Fair',
        reason: 'Intracoastal bay side is calm; inlet mouth requires caution due to swift tidal currents.'
      }
    },
    conditions: {
      waveHeightFt: 2.5,
      wavePeriodSec: 9,
      swellDirection: 'ESE 110°',
      windSpeedKts: 12,
      windDirection: 'E 90°',
      windType: 'Cross-shore',
      tideStatus: 'Rising',
      tideHeightFt: 2.2,
      nextTide: 'High 2.8ft at 3:45 PM',
      waterTempF: 78,
      waterVisibilityFt: 35,
      hazards: [
        { type: 'strong_current', label: 'Swift inlet tidal flow during ebb tide', severity: 'moderate' }
      ],
      hourlyForecast: [
        { time: '06:00', waveFt: 2.1, windKts: 9, tideFt: 1.1, windDir: 'E', condition: 'Calm Glass' },
        { time: '09:00', waveFt: 2.3, windKts: 11, tideFt: 1.8, windDir: 'E', condition: 'Light Chop' },
        { time: '12:00', waveFt: 2.5, windKts: 13, tideFt: 2.4, windDir: 'ENE', condition: 'Moderate Sea' },
        { time: '15:00', waveFt: 2.6, windKts: 14, tideFt: 2.8, windDir: 'ENE', condition: 'Breezy' },
        { time: '18:00', waveFt: 2.2, windKts: 10, tideFt: 2.1, windDir: 'E', condition: 'Gentle Swell' },
      ]
    },
    fishingData: {
      boatRampAvailable: true,
      rampType: 'Heavy-Duty Concrete, Deep Draft Rated',
      lanes: 6,
      maxVesselLengthFt: 48,
      marinaName: 'Haulover Beach Marina & Yacht Basin',
      slipsCount: 140,
      fuelDock: true,
      liveBaitShop: true,
      fishCleaningTable: true,
      rampFee: '$18 / launch (Free after 7 PM)',
      seasonalTargetSpecies: ['Sailfish', 'Mahi-Mahi', 'King Mackerel', 'Wahoo', 'Blackfin Tuna', 'Snook'],
      activeCharters: [
        {
          id: 'ch-01',
          name: 'Haulover Sportfishing Express',
          captain: 'Capt. Marcus Alvarez',
          boatName: 'Sea Strike 45',
          boatLengthFt: 45,
          boatType: 'Viking Convertible Sportfish',
          targetSpecies: ['Sailfish', 'Mahi-Mahi', 'Wahoo'],
          halfDayRate: 850,
          fullDayRate: 1450,
          rating: 4.9,
          reviewCount: 128,
          phone: '(305) 555-0192',
          email: 'marcus@seastrikecharters.com',
          dockLocation: 'Slip B-14, Haulover Marina',
          description: '30+ years navigating the Gulf Stream edges; equipped with dual Furuno sonar, tournament tackle, and air-conditioned salon.'
        },
        {
          id: 'ch-02',
          name: 'Blue Runner Inshore & Inlet Charters',
          captain: 'Capt. Dave Chen',
          boatName: 'Silver Tide 26',
          boatLengthFt: 26,
          boatType: 'SeaVee Center Console',
          targetSpecies: ['Tarpon', 'Snook', 'Jack Crevalle'],
          halfDayRate: 550,
          fullDayRate: 950,
          rating: 4.8,
          reviewCount: 89,
          phone: '(305) 555-0144',
          email: 'dave@bluerunnercharters.com',
          dockLocation: 'Slip C-03, Haulover Marina',
          description: 'Specializes in live-bait drift fishing along the inlet rocks and Biscayne Bay bridge pilings.'
        }
      ]
    },
    amenities: {
      parkingSpots: 450,
      parkingFee: '$7 weekdays, $10 weekends',
      lifeguardOnDuty: true,
      restroomsShowers: true,
      rentalGearShop: true,
      dogFriendly: true,
      accessType: 'Direct Drive-on'
    },
    description: 'Premier marine hub on Florida’s Atlantic coast with immediate access to the Gulf Stream just 2.5 miles offshore, alongside sheltered intracoastal waters.',
    insiderTip: 'For paddleboards and kayaks, launch on the bay side near the dog beach to bypass the inlet boat traffic.'
  },
  {
    id: 'south-beach-first-st',
    name: 'South Beach 1st Street Jetty',
    region: 'South Beach',
    stateCountry: 'Florida, USA',
    coordinates: { lat: 25.7675, lng: -80.1305 },
    image: surfImg,
    breakType: 'Point Break',
    activities: ['surfing', 'snorkeling_diving', 'kayak_sup'],
    suitability: {
      surfing: {
        score: 91,
        level: 'Optimal',
        reason: 'Jetty creates clean hollow right-hand wedges on NE/E swell; offshore wind groom.'
      },
      snorkeling_diving: {
        score: 84,
        level: 'Good',
        reason: 'Artificial reef blocks and natural limestone ledge host nurse sharks, spotted rays, and angelfish.'
      },
      kayak_sup: {
        score: 79,
        level: 'Good',
        reason: 'Calm morning waters before midday thermal breeze picks up.'
      },
      fishing_charter: {
        score: 35,
        level: 'Challenging',
        reason: 'No public boat ramp on beach; charter pickups occur at nearby Miami Beach Marina.'
      }
    },
    conditions: {
      waveHeightFt: 4.0,
      wavePeriodSec: 11,
      swellDirection: 'NE 45°',
      windSpeedKts: 9,
      windDirection: 'WNW 295°',
      windType: 'Offshore',
      tideStatus: 'Falling',
      tideHeightFt: 1.4,
      nextTide: 'Low 0.3ft at 1:15 PM',
      waterTempF: 77,
      waterVisibilityFt: 40,
      hazards: [
        { type: 'rocky_shelf', label: 'Submerged granite jetty boulders at low tide', severity: 'moderate' }
      ],
      hourlyForecast: [
        { time: '06:00', waveFt: 4.2, windKts: 8, tideFt: 2.1, windDir: 'WNW', condition: 'Clean Barrels' },
        { time: '09:00', waveFt: 4.0, windKts: 9, tideFt: 1.4, windDir: 'W', condition: 'Crisp Glass' },
        { time: '12:00', waveFt: 3.6, windKts: 11, tideFt: 0.5, windDir: 'NW', condition: 'Light Texture' },
        { time: '15:00', waveFt: 3.2, windKts: 13, tideFt: 1.2, windDir: 'ENE', condition: 'Onshore Bump' },
        { time: '18:00', waveFt: 3.0, windKts: 10, tideFt: 2.0, windDir: 'E', condition: 'Cross Chop' },
      ]
    },
    fishingData: {
      boatRampAvailable: false,
      rampType: 'None (Beach pedestrian zone only)',
      lanes: 0,
      maxVesselLengthFt: 0,
      fuelDock: false,
      liveBaitShop: false,
      fishCleaningTable: false,
      rampFee: 'N/A',
      seasonalTargetSpecies: ['Tarpon', 'Pompano', 'Snook (Surf Casting)'],
      activeCharters: []
    },
    amenities: {
      parkingSpots: 200,
      parkingFee: '$4.00 / hour (Metered City Parking)',
      lifeguardOnDuty: true,
      restroomsShowers: true,
      rentalGearShop: true,
      dogFriendly: false,
      accessType: 'Paved Lot to Boardwalk'
    },
    description: 'Iconic southern terminus of Miami Beach where Government Cut jetty forms South Florida’s most reliable sandbar and jetty wave setup.',
    insiderTip: 'Surf early between dawn and 9:30 AM before the city crowds arrive and lifeguards designate swimming zones.'
  },
  {
    id: 'crandon-park-key-biscayne',
    name: 'Crandon Park & Key Biscayne Sandbar',
    region: 'Key Biscayne',
    stateCountry: 'Florida, USA',
    coordinates: { lat: 25.7061, lng: -80.1583 },
    image: bayImg,
    breakType: 'Sheltered Lagoon',
    activities: ['kitesurfing', 'kayak_sup', 'windsurfing', 'boat_launch', 'fishing_charter'],
    suitability: {
      kitesurfing: {
        score: 97,
        level: 'Optimal',
        reason: 'Protected lagoon flats with side-onshore trade winds; certified launch zone with butter-flat water.'
      },
      kayak_sup: {
        score: 95,
        level: 'Optimal',
        reason: 'Vast shallow seagrass flats protected by barrier reef; zero heavy breaking waves.'
      },
      windsurfing: {
        score: 93,
        level: 'Optimal',
        reason: 'Expansive sandbar run with clean wind flow uninhibited by high-rises.'
      },
      fishing_charter: {
        score: 88,
        level: 'Good',
        reason: 'Crandon Marina provides direct transit to Biscayne National Park flats and offshore dropoffs.'
      }
    },
    conditions: {
      waveHeightFt: 1.0,
      wavePeriodSec: 6,
      swellDirection: 'SE 135°',
      windSpeedKts: 16,
      windDirection: 'ESE 115°',
      windType: 'Cross-shore',
      tideStatus: 'Rising',
      tideHeightFt: 1.8,
      nextTide: 'High 2.4ft at 4:20 PM',
      waterTempF: 79,
      waterVisibilityFt: 30,
      hazards: [
        { type: 'marine_life', label: 'Stingrays on shallow sandy flats (shuffle feet)', severity: 'low' }
      ],
      hourlyForecast: [
        { time: '06:00', waveFt: 0.8, windKts: 12, tideFt: 0.9, windDir: 'ESE', condition: 'Flat Calm' },
        { time: '09:00', waveFt: 1.0, windKts: 14, tideFt: 1.3, windDir: 'ESE', condition: 'Ideal Wind' },
        { time: '12:00', waveFt: 1.2, windKts: 16, tideFt: 1.7, windDir: 'SE', condition: 'Prime Glides' },
        { time: '15:00', waveFt: 1.3, windKts: 17, tideFt: 2.2, windDir: 'SE', condition: 'Steady Gusts' },
        { time: '18:00', waveFt: 1.0, windKts: 14, tideFt: 2.0, windDir: 'ESE', condition: 'Sunset Cruise' },
      ]
    },
    fishingData: {
      boatRampAvailable: true,
      rampType: 'Triple-Lane Concrete Ramp at Crandon Marina',
      lanes: 3,
      maxVesselLengthFt: 36,
      marinaName: 'Crandon Marina & Yacht Basin',
      slipsCount: 220,
      fuelDock: true,
      liveBaitShop: true,
      fishCleaningTable: true,
      rampFee: '$15 / day with trailer',
      seasonalTargetSpecies: ['Bonefish', 'Permit', 'Tarpon', 'Mangrove Snapper', 'Seatrout'],
      activeCharters: [
        {
          id: 'ch-03',
          name: 'Biscayne Flats Fly & Light Tackle',
          captain: 'Capt. Elena Cruz',
          boatName: 'Ghost Skiff 18',
          boatLengthFt: 18,
          boatType: 'Hell’s Bay Technical Poling Skiff',
          targetSpecies: ['Bonefish', 'Permit', 'Tarpon'],
          halfDayRate: 500,
          fullDayRate: 850,
          rating: 5.0,
          reviewCount: 94,
          phone: '(305) 555-0188',
          email: 'elena@biscayneflatssport.com',
          dockLocation: 'North Basin Slip 12, Crandon Marina',
          description: 'Sight-fishing specialist for the elusive "Biscayne Bay Grand Slam" across pristine flats.'
        }
      ]
    },
    amenities: {
      parkingSpots: 1200,
      parkingFee: '$5 weekdays, $7 weekends',
      lifeguardOnDuty: true,
      restroomsShowers: true,
      rentalGearShop: true,
      dogFriendly: false,
      accessType: 'Paved Lot to Boardwalk'
    },
    description: 'A 2-mile tropical sanctuary with calm translucent shallows, coconut palms, and an internationally renowned kitesurfing launch corridor.',
    insiderTip: 'Kitesurfers must check in at the North Beach concession stand for safety wristbands and designated zone briefing.'
  },
  {
    id: 'mission-bay-dana-landing',
    name: 'Mission Bay & Dana Landing Basin',
    region: 'San Diego',
    stateCountry: 'California, USA',
    coordinates: { lat: 32.7661, lng: -117.2364 },
    image: charterImg,
    breakType: 'Sheltered Lagoon',
    activities: ['fishing_charter', 'boat_launch', 'kayak_sup', 'windsurfing'],
    suitability: {
      fishing_charter: {
        score: 98,
        level: 'Optimal',
        reason: 'Premier Southern California gateway to Coronado Islands and offshore offshore Bluefin Tuna grounds.'
      },
      boat_launch: {
        score: 96,
        level: 'Optimal',
        reason: 'Free 4-lane launch ramp, 24-hr live bait receiver, fresh water washdown racks, and direct channel.'
      },
      kayak_sup: {
        score: 91,
        level: 'Optimal',
        reason: 'Designated 5-mph no-wake bays with calm mirror-like conditions, rental docks on site.'
      },
      surfing: {
        score: 25,
        level: 'Challenging',
        reason: 'Inside bay has zero ocean waves; head 0.8 miles west to Mission Beach oceanfront for surf.'
      }
    },
    conditions: {
      waveHeightFt: 0.5,
      wavePeriodSec: 14,
      swellDirection: 'W 270°',
      windSpeedKts: 7,
      windDirection: 'NW 315°',
      windType: 'Light & Variable',
      tideStatus: 'Rising',
      tideHeightFt: 3.8,
      nextTide: 'High 5.1ft at 6:10 PM',
      waterTempF: 66,
      waterVisibilityFt: 22,
      hazards: [
        { type: 'none', label: 'Calm water; follow 5mph marine navigation buoys', severity: 'low' }
      ],
      hourlyForecast: [
        { time: '05:00', waveFt: 0.2, windKts: 4, tideFt: 2.2, windDir: 'E', condition: 'Mirror Glass' },
        { time: '08:00', waveFt: 0.4, windKts: 6, tideFt: 3.1, windDir: 'W', condition: 'Smooth Glide' },
        { time: '11:00', waveFt: 0.6, windKts: 8, tideFt: 4.0, windDir: 'NW', condition: 'Gentle Ripple' },
        { time: '14:00', waveFt: 0.7, windKts: 10, tideFt: 4.8, windDir: 'NW', condition: 'Moderate Breeze' },
        { time: '17:00', waveFt: 0.5, windKts: 7, tideFt: 5.1, windDir: 'WNW', condition: 'Evening Calm' },
      ]
    },
    fishingData: {
      boatRampAvailable: true,
      rampType: 'Public Concrete 4-Lane with Finger Docks',
      lanes: 4,
      maxVesselLengthFt: 42,
      marinaName: 'Dana Landing Marina & Market',
      slipsCount: 180,
      fuelDock: true,
      liveBaitShop: true,
      fishCleaningTable: true,
      rampFee: 'Free Public Ramp (No Launch Fee)',
      seasonalTargetSpecies: ['Pacific Bluefin Tuna', 'Yellowtail', 'Calico Bass', 'Halibut', 'White Seabass'],
      activeCharters: [
        {
          id: 'ch-04',
          name: 'Pacific Offshore Expeditions',
          captain: 'Capt. Jake Sullivan',
          boatName: 'Invicta 38',
          boatLengthFt: 38,
          boatType: 'Custom Henriques Sportfisher',
          targetSpecies: ['Bluefin Tuna', 'Yellowtail', 'Dorado'],
          halfDayRate: 950,
          fullDayRate: 1800,
          rating: 4.9,
          reviewCount: 162,
          phone: '(619) 555-0133',
          email: 'jake@pacificoffshorecharters.com',
          dockLocation: 'Dana Landing Charter Dock A',
          description: 'Specializes in 12hr and overnight offshore tuna hunts utilizing side-scanning sonar and kites with yummy flyers.'
        },
        {
          id: 'ch-05',
          name: 'San Diego Bay & Inshore Light Tackle',
          captain: 'Capt. Sean Riley',
          boatName: 'Bay Strider 23',
          boatLengthFt: 23,
          boatType: 'Parker 2300 Center Console',
          targetSpecies: ['Spotted Bay Bass', 'Halibut', 'Yellowtail'],
          halfDayRate: 480,
          fullDayRate: 820,
          rating: 4.8,
          reviewCount: 78,
          phone: '(619) 555-0177',
          email: 'sean@sandiegoinshore.com',
          dockLocation: 'Dana Landing Slip 7',
          description: 'Family-friendly light tackle trips inside the bay and along the kelp beds of Point Loma.'
        }
      ]
    },
    amenities: {
      parkingSpots: 600,
      parkingFee: 'Free City Parking Lot (Oversized trailer bays available)',
      lifeguardOnDuty: true,
      restroomsShowers: true,
      rentalGearShop: true,
      dogFriendly: true,
      accessType: 'Direct Drive-on'
    },
    description: 'The premier aquatic playground of San Diego. Features the highest-volume sportfishing launch ramp on the West Coast, flanked by peaceful paddle lagoons.',
    insiderTip: 'Live anchovies and sardines can be purchased directly from the live bait barge in the channel 24 hours a day.'
  },
  {
    id: 'la-jolla-shores-cove',
    name: 'La Jolla Shores & Marine Sanctuary',
    region: 'La Jolla',
    stateCountry: 'California, USA',
    coordinates: { lat: 32.8583, lng: -117.2561 },
    image: heroImg,
    breakType: 'Beach Break',
    activities: ['surfing', 'snorkeling_diving', 'kayak_sup'],
    suitability: {
      snorkeling_diving: {
        score: 98,
        level: 'Optimal',
        reason: 'Protected underwater ecological reserve with leopard sharks, garibaldi, kelp forests, and submarine canyon.'
      },
      kayak_sup: {
        score: 93,
        level: 'Optimal',
        reason: 'Launch straight from the sand into the La Jolla sea caves and marine park.'
      },
      surfing: {
        score: 85,
        level: 'Good',
        reason: 'Gentle peeling beach break waves ideal for longboards, beginners, and progressive maneuvers.'
      },
      fishing_charter: {
        score: 10,
        level: 'Challenging',
        reason: 'Marine Protected Area (MPA) strictly forbids motorized launches and all fishing.'
      }
    },
    conditions: {
      waveHeightFt: 3.2,
      wavePeriodSec: 13,
      swellDirection: 'WNW 285°',
      windSpeedKts: 6,
      windDirection: 'E 85°',
      windType: 'Offshore',
      tideStatus: 'Falling',
      tideHeightFt: 2.1,
      nextTide: 'Low 1.1ft at 2:40 PM',
      waterTempF: 64,
      waterVisibilityFt: 45,
      hazards: [
        { type: 'none', label: 'Ecological Reserve: strict no-take fishing policy', severity: 'low' }
      ],
      hourlyForecast: [
        { time: '06:00', waveFt: 3.4, windKts: 5, tideFt: 3.5, windDir: 'E', condition: 'Clean Offshore Glass' },
        { time: '09:00', waveFt: 3.2, windKts: 6, tideFt: 2.7, windDir: 'E', condition: 'Crisp & Peeling' },
        { time: '12:00', waveFt: 3.0, windKts: 8, tideFt: 1.5, windDir: 'NW', condition: 'Light Sea Breeze' },
        { time: '15:00', waveFt: 2.8, windKts: 11, tideFt: 1.3, windDir: 'WNW', condition: 'Mild Surface Chop' },
        { time: '18:00', waveFt: 2.7, windKts: 6, tideFt: 2.8, windDir: 'W', condition: 'Gentle Swell' },
      ]
    },
    fishingData: {
      boatRampAvailable: false,
      rampType: 'None (Ecological Marine Sanctuary)',
      lanes: 0,
      maxVesselLengthFt: 0,
      fuelDock: false,
      liveBaitShop: false,
      fishCleaningTable: false,
      rampFee: 'N/A (Marine Protected Area)',
      seasonalTargetSpecies: ['Protected Reserve: No Taking or Fishing Allowed'],
      activeCharters: []
    },
    amenities: {
      parkingSpots: 350,
      parkingFee: 'Free Public Park Parking (Arrive before 8:30 AM)',
      lifeguardOnDuty: true,
      restroomsShowers: true,
      rentalGearShop: true,
      dogFriendly: false,
      accessType: 'Paved Lot to Boardwalk'
    },
    description: 'Renowned coastal haven with a submarine canyon dropping to 600ft, generating crystalline water clarity and gentle surf against sandy bluffs.',
    insiderTip: 'Leopard sharks congregate in knee-deep water right in front of the Marine Room restaurant during summer and fall.'
  },
  {
    id: 'oregon-inlet-fishing-center',
    name: 'Oregon Inlet & Cape Hatteras National Seashore',
    region: 'Nags Head & Outer Banks',
    stateCountry: 'North Carolina, USA',
    coordinates: { lat: 35.7972, lng: -75.5486 },
    image: charterImg,
    breakType: 'Inlet Channel',
    activities: ['fishing_charter', 'boat_launch', 'surfing', 'kitesurfing'],
    suitability: {
      fishing_charter: {
        score: 99,
        level: 'Optimal',
        reason: 'Legendary East Coast offshore hub with 30+ tournament custom Carolina sportfish boats targeting big game.'
      },
      boat_launch: {
        score: 95,
        level: 'Optimal',
        reason: 'Modern state-of-the-art concrete launch ramps with quick transit to the ocean or Pamlico Sound.'
      },
      surfing: {
        score: 88,
        level: 'Good',
        reason: 'Heavy Atlantic barrel swells along the south side of the bridge and Pea Island.'
      },
      kitesurfing: {
        score: 90,
        level: 'Optimal',
        reason: 'Pamlico Sound flats right behind the inlet offer world-class slick winds.'
      }
    },
    conditions: {
      waveHeightFt: 5.5,
      wavePeriodSec: 12,
      swellDirection: 'ENE 70°',
      windSpeedKts: 15,
      windDirection: 'NE 45°',
      windType: 'Cross-shore',
      tideStatus: 'Rising',
      tideHeightFt: 2.6,
      nextTide: 'High 3.2ft at 5:05 PM',
      waterTempF: 71,
      waterVisibilityFt: 25,
      hazards: [
        { type: 'rip_current', label: 'Strong undertow along ocean beaches', severity: 'high' },
        { type: 'small_craft', label: 'Bar crossing shoaling at low water', severity: 'moderate' }
      ],
      hourlyForecast: [
        { time: '05:00', waveFt: 5.2, windKts: 14, tideFt: 1.2, windDir: 'NE', condition: 'Heavy Swell' },
        { time: '08:00', waveFt: 5.5, windKts: 15, tideFt: 1.8, windDir: 'NE', condition: 'Sporty Seas' },
        { time: '11:00', waveFt: 5.8, windKts: 17, tideFt: 2.4, windDir: 'ENE', condition: 'Brisk Chop' },
        { time: '14:00', waveFt: 5.4, windKts: 16, tideFt: 3.0, windDir: 'NE', condition: 'Solid Barrels' },
        { time: '17:00', waveFt: 5.0, windKts: 13, tideFt: 3.2, windDir: 'NE', condition: 'Rolling Waves' },
      ]
    },
    fishingData: {
      boatRampAvailable: true,
      rampType: 'Dual Basin Concrete Multi-Lane with Commercial Slips',
      lanes: 5,
      maxVesselLengthFt: 60,
      marinaName: 'Oregon Inlet Fishing Center',
      slipsCount: 95,
      fuelDock: true,
      liveBaitShop: true,
      fishCleaningTable: true,
      rampFee: 'Free National Park Service Launch Ramp',
      seasonalTargetSpecies: ['Blue Marlin', 'Yellowfin Tuna', 'Wahoo', 'Mahi-Mahi', 'Striped Bass (Rockfish)', 'Red Drum'],
      activeCharters: [
        {
          id: 'ch-06',
          name: 'Carolina Bluewater Charters',
          captain: 'Capt. Bradley Baum',
          boatName: 'Tarheel Pride 57',
          boatLengthFt: 57,
          boatType: 'Custom Carolina Sportfisher (Ricky Scarborough)',
          targetSpecies: ['Blue Marlin', 'Yellowfin Tuna', 'Wahoo'],
          halfDayRate: 1100,
          fullDayRate: 2200,
          rating: 5.0,
          reviewCount: 215,
          phone: '(252) 555-0166',
          email: 'bradley@carolinabluewater.com',
          dockLocation: 'Slip 32, Oregon Inlet Fishing Center',
          description: 'Carolina flare hull engineered for heavy Atlantic chop; tournament proven winner with deep Gulf Stream range.'
        },
        {
          id: 'ch-07',
          name: 'Outer Banks Inshore Light Tackle',
          captain: 'Capt. Tyler O’Neal',
          boatName: 'Sound Runner 25',
          boatLengthFt: 25,
          boatType: 'Jones Brothers Cape Fisherman',
          targetSpecies: ['Red Drum', 'Speckled Trout', 'Flounder', 'Cobia'],
          halfDayRate: 500,
          fullDayRate: 900,
          rating: 4.9,
          reviewCount: 112,
          phone: '(252) 555-0128',
          email: 'tyler@obxinshore.com',
          dockLocation: 'Slip 14, Oregon Inlet',
          description: 'Exciting sight-casting for giant bull red drum in Pamlico Sound and along the ocean shoals.'
        }
      ]
    },
    amenities: {
      parkingSpots: 400,
      parkingFee: 'Free National Park Parking',
      lifeguardOnDuty: false,
      restroomsShowers: true,
      rentalGearShop: true,
      dogFriendly: true,
      accessType: 'Direct Drive-on'
    },
    description: 'The epicenter of North Carolina big game saltwater fishing, dividing Bodie Island and Pea Island at the confluence of the Labrador Current and Gulf Stream.',
    insiderTip: 'Beach driving (ORV) permit is required if driving 4x4 vehicles onto the sand at Ramp 4; deflate tires to 18-20 PSI.'
  },
  {
    id: 'kailua-beach-oahu',
    name: 'Kailua Beach & Lanikai Channel',
    region: 'Windward Coast, Oahu',
    stateCountry: 'Hawaii, USA',
    coordinates: { lat: 21.3994, lng: -157.7397 },
    image: bayImg,
    breakType: 'Reef Break',
    activities: ['kitesurfing', 'windsurfing', 'kayak_sup', 'snorkeling_diving'],
    suitability: {
      kitesurfing: {
        score: 96,
        level: 'Optimal',
        reason: 'Consistent NE Trade Winds blowing across fine powdery sand with deep turquoise lagoons.'
      },
      kayak_sup: {
        score: 94,
        level: 'Optimal',
        reason: 'Pristine 1-mile paddle route out to the Mokulua Islands seabird sanctuary.'
      },
      snorkeling_diving: {
        score: 86,
        level: 'Good',
        reason: 'Outer reef heads provide sightings of Honu (Hawaiian green sea turtles) and reef fish.'
      },
      fishing_charter: {
        score: 30,
        level: 'Challenging',
        reason: 'Non-motorized beach park; commercial charters depart from Heeia Kea Pier 8 miles north.'
      }
    },
    conditions: {
      waveHeightFt: 2.8,
      wavePeriodSec: 10,
      swellDirection: 'ENE 65°',
      windSpeedKts: 18,
      windDirection: 'ENE 70°',
      windType: 'Cross-shore',
      tideStatus: 'Falling',
      tideHeightFt: 1.2,
      nextTide: 'Low 0.2ft at 3:30 PM',
      waterTempF: 78,
      waterVisibilityFt: 55,
      hazards: [
        { type: 'marine_life', label: 'Portuguese man-o-war occasionally blow in with easterly winds', severity: 'moderate' }
      ],
      hourlyForecast: [
        { time: '06:00', waveFt: 2.2, windKts: 14, tideFt: 1.8, windDir: 'ENE', condition: 'Pristine Dawn' },
        { time: '09:00', waveFt: 2.6, windKts: 16, tideFt: 1.5, windDir: 'ENE', condition: 'Steady Trades' },
        { time: '12:00', waveFt: 2.9, windKts: 19, tideFt: 0.8, windDir: 'ENE', condition: 'Kite Haven' },
        { time: '15:00', waveFt: 2.8, windKts: 18, tideFt: 0.3, windDir: 'ENE', condition: 'Turquoise Glide' },
        { time: '18:00', waveFt: 2.4, windKts: 15, tideFt: 0.9, windDir: 'E', condition: 'Golden Dusk' },
      ]
    },
    fishingData: {
      boatRampAvailable: true,
      rampType: 'Single Lane Small Boat & Kayak Launch Ramp on Kaelepulu Stream',
      lanes: 1,
      maxVesselLengthFt: 18,
      marinaName: 'Kailua Beach Boat Ramp',
      slipsCount: 0,
      fuelDock: false,
      liveBaitShop: false,
      fishCleaningTable: true,
      rampFee: 'Free City Park Ramp',
      seasonalTargetSpecies: ['Mahi-Mahi', 'Ono (Wahoo)', 'Papio (Trevally)', 'Ahi (Yellowfin)'],
      activeCharters: []
    },
    amenities: {
      parkingSpots: 220,
      parkingFee: 'Free Public Beach Parking Lot',
      lifeguardOnDuty: true,
      restroomsShowers: true,
      rentalGearShop: true,
      dogFriendly: true,
      accessType: 'Paved Lot to Boardwalk'
    },
    description: 'Consistently ranked among America’s best beaches, celebrated for its 2.5 miles of fine white sand, turquoise water, and steady Pacific trade winds.',
    insiderTip: 'Kitesurfing is restricted to the northern end of the beach park after 11:00 AM to keep the main swimming corridor clear.'
  },
  {
    id: 'destin-pass-harbor',
    name: 'Destin East Pass & Harbor Boardwalk',
    region: 'Destin / Emerald Coast',
    stateCountry: 'Florida, USA',
    coordinates: { lat: 30.3928, lng: -86.5122 },
    image: charterImg,
    breakType: 'Inlet Channel',
    activities: ['fishing_charter', 'boat_launch', 'kayak_sup', 'snorkeling_diving'],
    suitability: {
      fishing_charter: {
        score: 99,
        level: 'Optimal',
        reason: 'Known as the "World’s Luckiest Fishing Village" with the largest charter fishing fleet in North America.'
      },
      boat_launch: {
        score: 95,
        level: 'Optimal',
        reason: 'Multiple deep-water city ramps, 10-minute run into 100-foot Gulf depths with 0 locks or drawbridges.'
      },
      kayak_sup: {
        score: 87,
        level: 'Good',
        reason: 'Vibrant paddle route to famous Crab Island sandbar during incoming tide.'
      },
      snorkeling_diving: {
        score: 83,
        level: 'Good',
        reason: 'East Pass jetties offer vibrant emerald visibility and artificial reef fish schools on high slack tide.'
      }
    },
    conditions: {
      waveHeightFt: 1.5,
      wavePeriodSec: 7,
      swellDirection: 'S 180°',
      windSpeedKts: 10,
      windDirection: 'SSE 155°',
      windType: 'Onshore',
      tideStatus: 'Rising',
      tideHeightFt: 1.3,
      nextTide: 'High 1.6ft at 4:50 PM',
      waterTempF: 75,
      waterVisibilityFt: 40,
      hazards: [
        { type: 'strong_current', label: 'Heavy recreational boat traffic around Crab Island', severity: 'moderate' }
      ],
      hourlyForecast: [
        { time: '06:00', waveFt: 1.1, windKts: 7, tideFt: 0.6, windDir: 'SE', condition: 'Emerald Glass' },
        { time: '09:00', waveFt: 1.3, windKts: 9, tideFt: 0.9, windDir: 'SSE', condition: 'Pleasant Breeze' },
        { time: '12:00', waveFt: 1.6, windKts: 11, tideFt: 1.2, windDir: 'S', condition: 'Mild Gulf Chop' },
        { time: '15:00', waveFt: 1.7, windKts: 12, tideFt: 1.5, windDir: 'S', condition: 'Active Water' },
        { time: '18:00', waveFt: 1.4, windKts: 8, tideFt: 1.4, windDir: 'SSE', condition: 'Sunset Cruise' },
      ]
    },
    fishingData: {
      boatRampAvailable: true,
      rampType: 'Joe’s Bayou & Destin Harbor Concrete Ramps',
      lanes: 4,
      maxVesselLengthFt: 45,
      marinaName: 'Destin Harbor Boardwalk & Marinas',
      slipsCount: 310,
      fuelDock: true,
      liveBaitShop: true,
      fishCleaningTable: true,
      rampFee: '$20 / day trailer pass',
      seasonalTargetSpecies: ['Red Snapper', 'Grouper', 'Cobias', 'King Mackerel', 'Sailfish', 'Mahi-Mahi'],
      activeCharters: [
        {
          id: 'ch-08',
          name: 'Emerald Coast Sportfishing Charters',
          captain: 'Capt. Hunter Vance',
          boatName: 'Reel Lucky 42',
          boatLengthFt: 42,
          boatType: 'Custom Hatteras Convertible',
          targetSpecies: ['Red Snapper', 'Gag Grouper', 'Amberjack', 'Mahi'],
          halfDayRate: 800,
          fullDayRate: 1550,
          rating: 4.9,
          reviewCount: 184,
          phone: '(850) 555-0149',
          email: 'hunter@destinreellucky.com',
          dockLocation: 'Slip 22, Destin Harbor Boardwalk',
          description: 'Specializes in bottom bouncing deep natural limestone reefs and trolling offshore weedlines.'
        }
      ]
    },
    amenities: {
      parkingSpots: 500,
      parkingFee: '$15 / day harbor parking structure',
      lifeguardOnDuty: true,
      restroomsShowers: true,
      rentalGearShop: true,
      dogFriendly: true,
      accessType: 'Direct Drive-on'
    },
    description: 'The crown jewel of the Florida Panhandle with sugar-white quartz sand, iridescent emerald waters, and instant access to the continental shelf.',
    insiderTip: 'For the clearest water at Crab Island, visit during the 2 hours before and after high slack tide when incoming Gulf water floods the bay.'
  }
];
