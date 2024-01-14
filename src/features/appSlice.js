import { createSlice } from '@reduxjs/toolkit';
import { sliceKeys } from '../utils/keys';
import { windowSize } from '../utils/constants';

// ==============================|| states ||============================== //
const initialState = {
  isSidebarOpen: true,
  isDarkMode: false,
  screen: { x: window.innerWidth, y: window.innerHeight },
  mouse: { x: -1, y: -1 }
};

// ==============================|| slice ||============================== //
export const appSlice = createSlice({
  name: sliceKeys.app,
  initialState,
  reducers: {
    /**
     * open sidebar action
     * @param action.payload : boolean
     */
    openSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    /**
     * set screen size action
     * @param action.payload : {x:number, y:number}
     */
    setScreenSize: (state, action) => {
      state.screen = action.payload;

      // toggle sidebar open or close depends on screen size
      if (state.screen.x < windowSize.md) {
        state.isSidebarOpen = false;
      } else if (state.screen.x > windowSize.lg) {
        state.isSidebarOpen = true;
      }
    },
    /**
     * set dark mode action
     * @param action.payload : bolean
     */
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    /**
     * set mouse position
     * @param action.payload : {x: number, y:number}
     */
    setMousePosition: (state, action) => {
      state.mouse = action.payload;
    }
  }
});

export const { openSidebar, setScreenSize, setDarkMode, setMousePosition } = appSlice.actions;
export const appReducer = appSlice.reducer;
