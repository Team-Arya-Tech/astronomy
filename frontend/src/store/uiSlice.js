import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  currentView: 'generator', // 'generator', '3d', 'ar', 'blueprint'
  theme: 'dark', // Default to dark theme for ancient astronomy feel
  notifications: [],
  isARSupported: false,
  is3DViewActive: false,
  blueprintView: false,
  loadingStates: {
    yantraGeneration: false,
    export: false,
    ar: false,
    solarCalculation: false
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setARSupported: (state, action) => {
      state.isARSupported = action.payload;
    },
    set3DViewActive: (state, action) => {
      state.is3DViewActive = action.payload;
    },
    setBlueprintView: (state, action) => {
      state.blueprintView = action.payload;
    },
    setLoadingState: (state, action) => {
      const { key, value } = action.payload;
      state.loadingStates[key] = value;
    }
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setCurrentView,
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications,
  setARSupported,
  set3DViewActive,
  setBlueprintView,
  setLoadingState
} = uiSlice.actions;

export default uiSlice.reducer;