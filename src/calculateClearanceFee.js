const feeStart = [
  49, 99, 199, 299, 349, 399, 449, 499, 549, 599, 699, 799, 899, 999, 1199, 1299, 1399, 1499, 1599, 1699,
  1799, 1999, 2399, 2499, 2999, 3499, 3999, 4499, 4999, 5999, 7499, 9999, 14999, 19999, 24999, 29999, 34999,
  10000000,
];

const feeResult = [
  1,
  1,
  25,
  50,
  75,
  75,
  110,
  110,
  125,
  130,
  140,
  155,
  170,
  185,
  200,
  225,
  240,
  250,
  260,
  275,
  285,
  300,
  325,
  335,
  350,
  400,
  450,
  575,
  600,
  625,
  650,
  675,
  700,
  '5.50%',
  '5.50%',
  '5.50%',
  '5.50%',
  '5.50%',
];

const usStates = {
  AB: { Calgary: 3210, Edmonton: 3210 },
  AL: {
    'Alabama Dothan': 2510,
    Birmingham: 2705,
    Dothan: 2645,
    Mobile: 2644,
    'Mobile South': 2510,
    Montgomery: 2660,
    Tanner: 2651,
  },
  AR: {
    Fayetteville: 2803,
    'Little Rock': 2810,
  },
  AZ: {
    Phoenix: 3140,
    Tucson: 3110,
  },
  CA: {
    Adelanto: 2990,
    Antelope: 3111,
    Bakersfield: 2972,
    'CrashedToys Sacramento': 2915,
    'd Bid Repo': 3005,
    Fresno: 3040,
    Hayward: 3190,
    'Long Beach': 2890,
    'Los Angeles': 2990,
    Martinez: 3190,
    Menton: 2928,
    'Rancho Cucamonga': 3040,
    REDDING: 3150,
    Sacramento: 3190,
    'San Bernardino': 2878,
    'San Diego': 3140,
    'San Jose': 3140,
    'So Sacramento': 2974,
    'Sun Valley': 3040,
    Vallejo: 3044,
    'Van Nuys': 3040,
  },
  CO: {
    'Colorado Springs': 2959,
    Denver: 2890,
    'Denver Central': 2873,
    'Denver South': 2977,
  },
  CT: {
    Hartford: 2560,
    'Hartford Springfield': 2510,
  },
  DC: {
    'Washington DC': 2640,
  },
  DE: {
    Seaford: 2314,
  },
  FL: {
    'Ft. Pierce': 2315,
    'Jacksonville East': 2160,
    'Jacksonville North': 2360,
    'Jacksonville West': 2160,
    'Miami Central': 2460,
    'Miami North': 2460,
    'Miami South': 2460,
    Ocala: 2310,
    'Orlando North': 2292,
    'Orlando South': 2410,
    'Punta Gorda': 2490,
    'Punta Gorda South': 2540,
    Tallahassee: 2710,
    'Tampa South': 2560,
    'West Palm Beach': 2460,
  },
  GA: {
    'Atlanta East': 2663,
    'Atlanta North': 2560,
    'Atlanta South': 2710,
    'Atlanta West': 2710,
    Augusta: 2765,
    Cartersville: 2643,
    'CrashedToys Atlanta': 2455,
    FAIRBURN: 2764,
    Macon: 2714,
    Savannah: 2609,
    Tifton: 2710,
  },
  HI: {
    Honolulu: 4336,
  },
  IA: {
    Davenport: 2745,
    'Des Moines': 2730,
  },
  ID: {
    Boise: 3290,
  },
  IL: {
    'Chicago North': 2760,
    'Chicago South': 2642,
    Peoria: 2676,
    'Southern Illinois': 2646,
    'St.Louis': 2411,
    Wheeling: 2687,
  },
  IN: {
    Cicero: 2590,
    DYER: 3003,
    'Fort Wayne': 2512,
    Hammond: 2578,
    'hartford city': 2672,
    Indianapolis: 2672,
  },
  KS: {
    'Kansas City': 2810,
    'Kansas City East': 2860,
    'Kansas City West': 2885,
    Wichita: 2743,
  },
  KY: {
    Earlington: 3010,
    'Lexington East': 2810,
    'Lexington West': 2610,
    Louisville: 2860,
    Walton: 2810,
  },
  LA: {
    'Baton Rouge': 2760,
    'New Orleans': 2710,
    Shreveport: 2260,
  },
  MA: {
    Freetown: 2635,
    'National Offsite Auction': 2310,
    'North Boston': 2560,
    'South Boston': 2460,
    'West Warren': 2510,
  },
  MD: {
    Baltimore: 2560,
    'Baltimore East': 2510,
  },
  ME: {
    Lyman: 2558,
    WINDHAM: 2658,
  },
  MI: {
    Detroit: 2610,
    Flint: 2560,
    Ionia: 2658,
    Kincheloe: 3007,
    Lansing: 2611,
  },
  MN: {
    'Crashedtoys Minneapolis': 2534,
    Minneapolis: 2785,
    'Minneapolis North': 2860,
    'St. Cloud': 2744,
  },
  MO: {
    Columbia: 2760,
    Sikeston: 2790,
    Springfield: 2840,
    'St. Louis': 2702,
  },
  MS: {
    Jackson: 2610,
  },
  MT: {
    Billings: 3360,
    Helena: 3410,
  },
  NB: {
    'Atlantic Canada Auction': 2510,
    Moncton: 2560,
  },
  NC: {
    'China Grove': 2710,
    Concord: 2590,
    Gastonia: 2790,
    LUMBERTON: 2765,
    Mebane: 2675,
    Mocksville: 2610,
    Raleigh: 2740,
    'Raleigh North': 2790,
  },
  ND: {
    Bismarck: 3221,
  },
  NE: {
    Lincoln: 2775,
  },
  NH: {
    Candia: 2650,
  },
  NJ: {
    'Glassboro East': 2315,
    'GLASSBORO WEST': 2260,
    Somerville: 2260,
    Trenton: 2440,
  },
  NM: {
    Albuquerque: 2700,
  },
  NC: {
    Halifax: 2610,
  },
  NV: {
    'Las Vegas': 3190,
    Reno: 3120,
  },
  NY: {
    Albany: 2510,
    Buffalo: 2575,
    'Long Island': 2460,
    Newburgh: 2510,
    Rochester: 2474,
    Syracuse: 2450,
  },
  OH: {
    'Cleveland East': 2587,
    'Cleveland West': 2760,
    Columbus: 2640,
    Dayton: 2622,
  },
  OK: {
    'Oklahoma City': 2800,
    Tulsa: 2697,
  },
  ON: {
    London: 2310,
    Toronto: 2285,
  },
  OR: {
    Eugene: 3415,
    'Portland North': 3600,
    'Portland South': 3390,
  },
  PA: {
    Altoona: 2503,
    Chambersburg: 2410,
    Harrisburg: 2417,
    Philadelphia: 2440,
    'Philadelphia East': 2425,
    'Pittsburgh East': 2310,
    'Pittsburgh North': 2510,
    'Pittsburgh South': 2560,
    'PITTSBURGH WEST': 2535,
    Scranton: 2560,
    'York Haven': 2610,
  },
  QC: {
    Montreal: 2210,
  },
  RI: {
    Exeter: 2584,
  },
  SC: {
    Columbia: 2805,
    Greer: 2510,
    'North Charleston': 2510,
    Spartanburg: 2815,
  },
  SD: {
    'Rapid City': 3310,
  },
  TN: {
    Knoxville: 2910,
    Memphis: 2960,
    Nashville: 2910,
  },
  TX: {
    Abilene: 2460,
    Amarillo: 2660,
    Andrews: 2590,
    Austin: 2591,
    'Central Region': 2410,
    'Corpus Christi': 2424,
    'CrashedToys Dallas': 2346,
    Dallas: 2465,
    'Dallas South': 2465,
    'DRIVE Dallas': 2340,
    'Eastern Region': 2410,
    'El Paso': 2628,
    'Ft. Worth': 2585,
    Houston: 2510,
    'Houston East': 2470,
    Longview: 2460,
    Lufkin: 2460,
    McAllen: 2560,
    'Mountain Region': 2410,
    'Pacific Region': 2360,
    'San Antonio': 2560,
    Waco: 2560,
  },
  UT: {
    Ogden: 3090,
    'Salt Lake City': 3290,
    'Salt Lake City North': 3000,
  },
  VA: {
    Danville: 2572,
    FREDERICKSBURG: 2610,
    Hampton: 2570,
    Richmond: 2515,
    'RICHMOND EAST': 2510,
  },
  WA: {
    Graham: 3460,
    'North Seattle': 3460,
    Pasco: 3253,
    Spokane: 3536,
  },
  WI: {
    Appleton: 2660,
    Madison: 2633,
    'Madison South': 2683,
    Milwaukee: 2620,
    'Milwaukee North': 2670,
    'Milwaukee South': 2720,
  },
  WV: {
    Charleston: 2660,
  },
  WY: {
    Casper: 3160,
  },
};

const internetStart = [99, 499, 999, 1499, 1999, 3999, 5999, 7999, 10000000];

const internetResult = [0, 39, 49, 69, 79, 89, 99, 119, 129];

export default function calculateClearanceFee(year, month, carPrice, engineSize, location, change) {
  let shipment = 2500;
  location = location.toLowerCase();
  let state = '';
  let town = '';
  state = location.slice(1, 3);
  let key = '';
  if (location.includes('sublot')) {
    town = location.slice(6, location.length - 8);
  } else {
    town = location.slice(6, location.length - 1);
  }
  if (Object.keys(usStates[state.toUpperCase()])[0]) {
    key = Object.keys(usStates[state.toUpperCase()]).find((item) => item.toLowerCase() === town);
  }
  if (key && state && town) {
    shipment = usStates[state.toUpperCase()][key];
  }
  // console.log(usStates[state.toUpperCase()][key]);
  let fob = 0;
  if (carPrice >= 15000) {
    fob = Math.round((carPrice * 5.5) / 100 + 129 + 79 + 100);
    carPrice = carPrice + fob + 2500;
  } else {
    fob = Math.round(
      feeResult[feeStart.indexOf(feeStart.find((item, index) => item >= carPrice))] +
        internetResult[internetStart.indexOf(internetStart.find((item, index) => item >= carPrice))] +
        79 +
        70
    );
    carPrice = carPrice + fob + 2500;
  }
  let clearance = 0;
  let AAH = 0;
  let max = 0;
  const numMonth = month < new Date().getMonth() + 2 && month ? 1 : 0;
  let nature = new Date().getFullYear() + numMonth - year > 4 ? Math.round((carPrice / change) * 0.02) : 0;
  if (new Date().getFullYear() + numMonth - 3 <= year) {
    if (engineSize < 2.9) {
      // clearance = ((carPrice / change) * 0.15 + carPrice / change) * 0.2 + (carPrice / change) * 0.15;
      AAH = Math.round(((carPrice / change) * 0.15 + carPrice / change) * 0.2);
      max = Math.round((carPrice / change) * 0.15);
      nature = 0;
    } else {
      // clearance = ((carPrice / change) * 0.125 + carPrice / change) * 0.2 + (carPrice / change) * 0.125;
      AAH = Math.round(((carPrice / change) * 0.125 + carPrice / change) * 0.2);
      max = Math.round((carPrice / change) * 0.125);
      nature = 0;
    }
  } else {
    if (engineSize <= 1 || (engineSize > 1.5 && engineSize <= 1.8)) {
      max = Math.round(
        engineSize * 0.36 * 1000 < (carPrice / change) * 0.2
          ? (carPrice / change) * 0.2
          : engineSize * 0.36 * 1000
      );
      AAH = Math.round((max + carPrice / change) * 0.2);
    } else if (engineSize > 1 && engineSize <= 1.5) {
      max = Math.round(
        engineSize * 0.4 * 1000 < (carPrice / change) * 0.2
          ? (carPrice / change) * 0.2
          : engineSize * 0.4 * 1000
      );
      AAH = Math.round((max + carPrice / change) * 0.2);
    } else if (engineSize > 1.8 && engineSize <= 3) {
      max = Math.round(
        engineSize * 0.44 * 1000 < (carPrice / change) * 0.2
          ? (carPrice / change) * 0.2
          : engineSize * 0.44 * 1000
      );
      AAH = Math.round((max + carPrice / change) * 0.2);
    } else {
      max = Math.round(
        engineSize * 0.8 * 1000 < (carPrice / change) * 0.2
          ? (carPrice / change) * 0.2
          : engineSize * 0.8 * 1000
      );
      AAH = Math.round((max + carPrice / engineSize) * 0.2);
    }
  }
  max = Math.round(max * change);
  AAH = Math.round(AAH * change);
  nature = Math.round(nature * change);
  clearance = max + AAH + nature;
  // let shipment = 2500;
  // console.log(nature);
  return { clearance, fob, AAH, max, nature, shipment };
}
