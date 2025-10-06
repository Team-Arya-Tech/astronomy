import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentYantra: null,
  coordinates: {
    latitude: 28.6139, // Delhi default
    longitude: 77.2090,
    elevation: 216
  },
  selectedYantraType: 'samrat_yantra',
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