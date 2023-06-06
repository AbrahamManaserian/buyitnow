import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CopartIcon } from '../SVGIcons';
import { getText, textCopartCars } from '../texts';
import { AppContext } from '../App';

const makeModels = {
  AUDI: [
    'A5',
    'A4',
    'Q5',
    'Q7',
    'SQ5',
    'Q3',
    'A3',
    'R8',
    'RS3',
    'S4-RS4',
    'A7',
    'A6',
    'S5-RS5',
    'E-TRON',
    'Q8',
    'SQ5 SPORTB',
    'S3',
    'A8',
    'S8',
    'S7-RS7',
    'E-TRON CHR',
    'SQ7',
    'E-TRON GT',
    'TT',
    'RS E-TRON',
  ],
  BMW: [
    '5 SERIES',
    'X3',
    '4 SERIES',
    'X6',
    '3 SERIES',
    'M3',
    'X4',
    'M8',
    'X5',
    'X2',
    'Z4',
    'X7',
    '7 SERIES',
    'I SERIES',
    '2 SERIES',
    'X1',
    'M4',
    'M5',
    'R-SERIES',
    'I4 EDRIVE4',
    'F-SERIES',
    'M7',
    'S',
    'IX XDRIVE5',
    'M2',
    'X3 M',
    '8 SERIES',
    'C-SERIES',
    'G-SERIES',
    'X4 M',
    'K-SERIES',
    'M440I GRAN',
    'R18 B',
  ],

  CHEVROLET: [
    'EQUINOX',
    'MALIBU',
    'TRAVERSE',
    'CAMARO',
    'CRUZE',
    'SILVERADO',
    'BOLT',
    'SONIC',
    'COLORADO',
    'TRAILBLZR',
    'TRAX',
    'SUBURBAN',
    'EXPRESS',
    'SPARK',
    'IMPALA',
    'CORVETTE',
    'CAMARO LT1',
    'BLAZER',
    'TAHOE',
    'C/K4500',
    'C/K2500',
    'C/K5500',
    'VOLT',
    'C/K1500',
    'C/K6500',
  ],
  DODGE: [
    'CHARGER',
    'CHALLENGER',
    'JOURNEY',
    'DURANGO',
    'CARAVAN',
    'RAM 1500',
    'ALL OTHER',
    'PROMASTER',
    'D SERIES',
    'RAM 2500',
  ],
  FORD: [
    'TRANSIT',
    'MUSTANG',
    'RANGER',
    'F450',
    'ECOSPORT',
    'EXPLORER',
    'ESCAPE',
    'BRONCO',
    'F530',
    'F-150',
    'EDGE',
    'FUSION',
    'F350',
    'F250',
    'F750',
    'FOCUS',
    'FLEX',
    'EXPEDITION',
    'FIESTA',
    'F150',
    'MAVERICK',
    'TAURUS',
    'TRACTOR',
    'ECONOLINE',
    'F590',
    'F550',
    'F650',
    'BRONCO RAP',
    'FIGO',
    'F600',
    'BADLAND SA',
    'ESCAPE PLA',
    'CMAX',
  ],
  GMC: [
    'YUKON',
    'SAVANA',
    'ACADIA',
    'SIERRA',
    'CANYON',
    'TERRAIN',
    'ACADIA DEN',
    'TERRAIN AT',
    'ALTIMA BAS',
    'C/K/R2500',
  ],
  HONDA: [
    'CIVIC',
    'PILOT',
    'ACCORD',
    'INSIGHT',
    'HR-V',
    'CRV',
    'CRF CYCLE',
    'ODYSSEY',
    'TRX',
    'CLARITY',
    'VT CYCLE',
    'CM CYCLE',
    'FIT',
    'RIDGELINE',
    'PASSPORT',
    'CBR CYCLE',
    'GL CYCLE',
    'ALL OTHER',
    'SIDEBYSIDE',
    'CITY',
    'NVA110 B',
    'CFMOTO',
    'GROM',
    'CUB',
    'CMX1100 T',
    'NC CYCLE',
    'CB CYCLE',
    'TALON',
    'ODYSSEY SP',
    'ADV150',
  ],
  HYUNDAI: [
    'GENESIS',
    'SANTA FE',
    'PALISADE',
    'ELANTRA',
    'IONIQ',
    'SONATA',
    'KONA',
    'TUCSON',
    'ACCENT',
    'VENUE',
    'VELOSTER',
    'NEXO',
    'SANTA CRUZ',
    'TRAILER',
    'PALISADE X',
    'DRY VAN',
    'ALL OTHER',
  ],
  INFINITI: [
    'Q50',
    'QX60',
    'QX50',
    'QX80',
    'Q70',
    'QX30',
    'Q60',
    'QX55 ESSEN',
    'QX60 SENSO',
    'QX60 AUTOG',
    'QX50 AUTOG',
    'QX55 LUXE',
    'QX80 SENSO',
  ],
  JAGUAR: ['F-PACE', 'XE', 'F-TYPE', 'ETYPE', 'I-PACE', 'XJ', 'XF'],
  JEEP: [
    'GRAND CHER',
    'WRANGLER',
    'COMPASS',
    'CHEROKEE',
    'RENEGADE',
    'GLADIATOR',
    'WAGONEER',
    'GRAND WAGO',
    'CHEROKEE A',
    'RENEGADE A',
  ],
  KIA: [
    'K5',
    'SOUL',
    'NIRO',
    'SPORTAGE',
    'FORTE',
    'OPTIMA',
    'NIRO WIND',
    'RIO',
    'SORENTO',
    'TELLURIDE',
    'SELTOS',
    'STINGER',
    'CARNIVAL L',
    'SEDONA',
    'CARNIVAL S',
    'SPORTAGE X',
    'SELTOS NIG',
    'CADENZA',
    'EV6 GT LIN',
    'K900',
    'EV6 LIGHT',
    'CARNIVAL E',
    'NIRO S',
  ],
  'LAND ROVER': ['RANGEROVER', 'DISCOVERY', 'DEFENDER', 'ALL OTHER', 'BOAT'],
  LEXUS: [
    'RX450',
    'GX',
    'IS',
    'UX 250H',
    'ES300',
    'LS500',
    'NX',
    'ES350',
    'RX350',
    'RC300',
    'UX 200 BAS',
    'IS 350 F S',
    'UX 200',
    'GS350',
    'LX 600 BAS',
    'RC350',
    'NX 250',
    'UX 250H PR',
    'NX 350',
    'NX 450H',
    'RX 500H F',
    'LX570',
    'ES250',
    'NX 350H',
    'LC500',
  ],
  MAZDA: [
    '6',
    'CX-5',
    'CX-3',
    '3',
    'CX-9',
    'CX-50 PREM',
    'CX30',
    'CX-5 PREFE',
    'MX5',
    'CX-5 CARBO',
    'CX-50 PREF',
    '5',
    'CX-5 SELEC',
    'CX-5 PREMI',
  ],
  'MERCEDES-BENZ': [
    'GLS-CLASS',
    'E-CLASS',
    'GLC-CLASS',
    'C-CLASS',
    'GLE-CLASS',
    'G-CLASS',
    'S-CLASS',
    'CLA-CLASS',
    'SPRINTER',
    'GLB-CLASS',
    'CLC-CLASS',
    'EQS 450+',
    'GLA-CLASS',
    'GT-CLASS',
    'A-CLASS',
    'EQS SEDAN',
    'SLC-CLASS',
    'METRIS',
    'SL-CLASS',
    'EQB 300 4M',
    'CLS-CLASS',
  ],
  MINI: ['COOPER'],
  MITSUBISHI: ['MIRAGE', 'OUTLANDER', 'ECLIPSE', 'MIRAGE LE', 'ALL OTHER', 'ALL MODELS', 'RVR ES'],
  NISSAN: [
    'SENTRA',
    'ALTIMA',
    'ARMADA',
    'ROGUE',
    'VERSA',
    'NV',
    'PATHFINDER',
    'FRONTIER',
    'MAXIMA',
    'LEAF',
    '370Z',
    'KICKS',
    'MURANO',
    'TITAN',
    '200SX',
    'ALL OTHER',
    'QASHQAI SV',
    'QASHQAI S',
    '210',
  ],
  PORSCHE: ['CAYMAN', 'MACAN', 'MACAN BASE', 'CAYENNE', 'TAYCAN', 'PANAMERA', '911', 'CAYENNE BA', 'BOXSTER'],
  SUZUKI: [
    'GSXR600',
    'GSX1300',
    'GSX1300 RR',
    'DIRTBIKE',
    'GSXR750',
    'DL1050 RC',
    'GSX-S750 M',
    'CYC VZ/VZR',
    'GSXR1000',
    'ATV',
  ],
  TESLA: ['MODEL 3', 'MODEL Y', 'MODEL S', 'MODEL X'],
  TOYOTA: [
    'PRIUS',
    'VENZA',
    'COROLLA',
    'TUNDRA',
    'TACOMA',
    'RAV4',
    'CAMRY',
    'SIENNA',
    '4RUNNER',
    'HIGHLANDER',
    'PRIUS NIGH',
    'GR 86 PREM',
    'MIRAI',
    'AVALON',
    'VENZA HYBR',
    '86',
    'GR 86',
    'C-HR',
    'COROLLA CR',
    'SUPRA',
    'YARIS',
    'ALL OTHER',
    'SEQUOIA',
    '4RUNNER SE',
  ],
  VOLKSWAGEN: [
    'ID.4 PRO S',
    'ATLAS',
    'JETTA',
    'GOLF',
    'ARTEON',
    'TIGUAN',
    'PASSAT',
    'TAOS SE',
    'TAOS S',
    'BEETLE',
    'TIGUAN LIM',
    'ID.4 PRO',
    'GTI',
    'TAOS SE IQ',
    'GTI SE',
    'TAOS SEL',
    'PASSAT LIM',
    'ID.4',
  ],
  VOLVO: [
    'VN',
    'XC90',
    'XC60',
    'V60',
    'V90',
    'XC40',
    'S60',
    'XC40 PLUS',
    'S90 B6 R-D',
    'XC60 B5 IN',
    'XC60 B6 IN',
    'XC90 T8 RE',
    'S90',
    'XC60 B5 MO',
    'S60 B5 MOM',
    'XC40 P8 RE',
    'XC60 CORE',
    'XC60 T8 RE',
    'VNR',
    'XC90 CORE',
    'S90 T8 REC',
    'S60 B5 INS',
    'XC60 ULTIM',
    'XC60 PLUS',
  ],
};


export function CarInputs({ auction, make, model }) {
  const url = new URL(window.location.href);
  const navigate = useNavigate();
  const handleClickSearch = (make, model) => {
    // console.log(url);
    if (url.searchParams.get('make')) {
      url.searchParams.set('make', make);
      url.searchParams.set('model', model);
      // console.log('asd');
      navigate(url.search);
    } else {
      navigate(`/search?auction=${auction}&make=${make}&model=${model}&key=buynow`);
    }
  };
  const [inputs, setInputs] = useState({
    make: url.searchParams.get('make') || '',
    model: url.searchParams.get('model') || '',
  });

  const handleChange = (event) => {
    if (event.target.name === 'make') {
      setInputs({ [event.target.name]: event.target.value, model: '' });
      return;
    }
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const context = useContext(AppContext);
  // console.log(makes[inputs.make]);
  return (
    <Grid item xs={12} container sx={{ m: 1, mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', pb: 2 }}>
        <CopartIcon />
        <Typography sx={{ fontSize: '17px' }} marginLeft="10px">
          {getText('cars', context.language, textCopartCars)} - Buy it now
        </Typography>
      </Box>
      <Grid item container ml={{ xs: 0, sm: 4 }} mt={2} xs={12}>
        <FormControl sx={{ width: { xs: '50%', sm: '220px' }, pr: '4px' }} size="small">
          <InputLabel>Make</InputLabel>
          <Select name="make" value={inputs.make} label="Make" onChange={handleChange}>
            {Object.keys(makeModels).map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          disabled={!inputs.make ? true : false}
          sx={{ width: { xs: '50%', sm: '220px' }, pl: '4px' }}
          size="small"
        >
          <InputLabel sx={{ px: '4px' }}>Model</InputLabel>
          <Select
            name="model"
            // id="demo-simple-select"
            value={inputs.model}
            label="Model"
            onChange={handleChange}
          >
            {makeModels[inputs.make]?.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          onClick={() => handleClickSearch(inputs.make, inputs.model)}
          sx={{ textTransform: 'capitalize', m: { xs: '8px 0  0 0', sm: '0 0  0 8px' }, px: '25px' }}
          size="small"
          variant="contained"
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
