import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentYantra: null,
  coordinates: {
    latitude: 28.6139, // Delhi default
    longitude: 77.2090,
    elevation: 216
  },
  selectedYantraType: '',  // Start with empty selection to avoid out-of-range error
  yantraSpecs: null,
  loading: false,
  error: null,
  scaleFactor: 1.0,
  generatedData: null,
  solarPosition: null,
  availableYantras: [
    {
      id: 'samrat_yantra',
      name: 'Samrat Yantra (Great Sundial)',
      description: 'Large sundial for precise time measurement',
      accuracy: '±2 minutes'
    },
    {
      id: 'rama_yantra',
      name: 'Rama Yantra (Cylindrical Altitude-Azimuth)',
      description: 'Cylindrical structure for measuring celestial coordinates',
      accuracy: '±0.5° altitude, ±1° azimuth'
    },
    {
      id: 'jai_prakash_yantra',
      name: 'Jai Prakash Yantra (Hemispherical Sundial)',
      description: 'Hemispherical bowl representing celestial sphere',
      accuracy: '±1 minute time, ±0.5° coordinates'
    },
    {
      id: 'digamsa_yantra',
      name: 'Digamsa Yantra (Azimuth-Altitude Instrument)',
      description: 'Vertical semicircle for measuring azimuthal directions',
      accuracy: '±0.5° azimuth and altitude'
    },
    {
      id: 'dhruva_protha_chakra',
      name: 'Dhruva-Protha-Chakra (Pole Circle)',
      description: 'Circular disk for determining celestial pole position',
      accuracy: '±0.1° latitude, ±4 minutes time'
    },
    {
      id: 'kapala_yantra',
      name: 'Kapala Yantra (Bowl Sundial)',
      description: 'Hemispherical bowl sundial for time and seasonal observations',
      accuracy: '±3 minutes time, ±3 days seasonal'
    },
    {
      id: 'chakra_yantra',
      name: 'Chakra Yantra (Ring Dial)',
      description: 'Nested circular rings for solar observations',
      accuracy: '±0.2° angular measurements'
    },
    {
      id: 'unnatamsa_yantra',
      name: 'Unnatamsa Yantra (Solar Altitude Instrument)',
      description: 'Quarter-circle arc for measuring solar altitude angles',
      accuracy: '±0.25° altitude, ±5 minutes time'
    }
  ]
};

const yantraSlice = createSlice({
  name: 'yantra',
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    setSelectedYantraType: (state, action) => {
      state.selectedYantraType = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setYantraSpecs: (state, action) => {
      state.yantraSpecs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setScaleFactor: (state, action) => {
      state.scaleFactor = action.payload;
    },
    setGeneratedData: (state, action) => {
      state.generatedData = action.payload;
    },
    setSolarPosition: (state, action) => {
      state.solarPosition = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetYantra: (state) => {
      state.yantraSpecs = null;
      state.generatedData = null;
      state.error = null;
      state.loading = false;
    }
  },
});

export const {
  setCoordinates,
  setSelectedYantraType,
  setLoading,
  setError,
  setYantraSpecs,
  setScaleFactor,
  setGeneratedData,
  setSolarPosition,
  clearError,
  resetYantra
} = yantraSlice.actions;

export default yantraSlice.reducer;