import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sliceKeys } from '../utils/keys';
import { canvasElementType } from '../utils/constants';
// ==============================|| states ||============================== //
const initialState = {
  sidebarDetail: {
    width: 300,
    open: false,
    resizing: false
  },
  selectedSidebarItem: -1,

  isHeaderMenuOpen: false,

  isSpaceKeyHeld: false,

  canvasContentWidth: -1,
  canvasContentHeight: -1,
  canvas: [],
  selectedCanvas: {}

  // selectedElement: {}
};

// ==============================|| slice ||============================== //
export const canvasSlice = createSlice({
  name: sliceKeys.canvas,
  initialState,
  reducers: {
    openSidebarDetail: (state, action) => {
      state.sidebarDetail.open = action.payload;
    },
    updateSidbarDetailWidth: (state, action) => {
      state.sidebarDetail.width = action.payload;
    },
    setSidebarIsResizing: (state, action) => {
      state.sidebarDetail.resizing = action.payload;
    },
    updateSelectedSidebarItem: (state, action) => {
      state.selectedSidebarItem = action.payload;
      state.sidebarDetail.open = true;
    },
    openCanvasHeaderMenu: (state, action) => {
      state.isHeaderMenuOpen = action.payload;
    },

    setIsSpaceKeyHeld: (state, action) => {
      state.isSpaceKeyHeld = action.payload;
    },

    addCanvas: (state, action) => {
      const newCanvas = {
        id: nanoid(),
        width: action.payload.width,
        height: action.payload.height,
        name: action.payload.name,
        scale: action.payload.scale,
        offset: action.payload.offset,
        elements: []
      };

      state.selectedCanvas = newCanvas;
      state.canvas.push(newCanvas);
    },
    updateSelectedCanvas: (state, action) => {
      state.selectedCanvas = action.payload;
    },
    deleteCanvas: (state, action) => {
      state.canvas = state.canvas.filter((data) => {
        if (data.id != action.payload) {
          return data;
        }
      });

      if (state.selectedCanvas.id == action.payload) {
        state.selectedCanvas = state.canvas[0] ?? {};
      }
    },
    updateCanvasScale: (state, action) => {
      state.selectedCanvas.scale = action.payload;
      state.canvas = state.canvas.filter((data) => {
        if (data.id == state.selectedCanvas.id) {
          data.scale = action.payload;
        }
        return data;
      });
    },
    updateCanvasOffset: (state, action) => {
      state.selectedCanvas.offset = action.payload;
      state.canvas = state.canvas.filter((data) => {
        if (data.id == state.selectedCanvas.id) {
          data.offset = action.payload;
        }
        return data;
      });
    },
    setCanvasContentWidth: (state, action) => {
      state.canvasContentWidth = action.payload;
    },
    setCanvasContentHeight: (state, action) => {
      state.canvasContentHeight = action.payload;
    },

    addCanvasElement: (state, action) => {
      const newTextElement = {
        id: nanoid(),
        ...action.payload
      };
      // console.log(newTextElement);
      // state.selectedElement = newTextElement;
      state.selectedCanvas.elements = state.selectedCanvas.elements.map((element) => {
        element.selected = false;
        return element;
      });
      state.selectedCanvas.elements.push(newTextElement);
      state.canvas = state.canvas.map((data) => {
        if (data.id == state.selectedCanvas.id) {
          data = state.selectedCanvas;
        }
        return data;
      });
      console.log(state.canvas);
    },
    updateCanvasElement: (state, action) => {
      state.selectedCanvas.elements = state.selectedCanvas.elements.map((element) => {
        if (element.id == action.payload.id) {
          element = action.payload;
        }
        return element;
      });
      state.canvas = state.canvas.map((data) => {
        if (data.id == state.selectedCanvas.id) {
          data = state.selectedCanvas;
        }
        return data;
      });
    },
    setAllElementSelected: (state, action) => {
      state.selectedCanvas.elements = state.selectedCanvas.elements.map((element) => {
        element.selected = action.payload;
        return element;
      });

      state.canvas = state.canvas.map((data) => {
        if (data.id == state.selectedCanvas.id) {
          data = state.selectedCanvas;
        }
        return data;
      });
    },
    deleteSelectedElement: (state) => {
      state.selectedCanvas.elements = state.selectedCanvas.elements.filter((element) => {
        if (!element.selected) {
          return element;
        }
      });

      state.canvas = state.canvas.map((data) => {
        if (data.id == state.selectedCanvas.id) {
          data = state.selectedCanvas;
        }
        return data;
      });
    }
  }
});

export const {
  openSidebarDetail,
  updateSidbarDetailWidth,
  setSidebarIsResizing,
  updateSelectedSidebarItem,
  openCanvasHeaderMenu,
  setIsSpaceKeyHeld,

  addCanvas,
  updateSelectedCanvas,
  deleteCanvas,
  updateCanvasScale,
  updateCanvasOffset,

  setCanvasContentWidth,
  setCanvasContentHeight,

  addCanvasElement,
  updateCanvasElement,
  setAllElementSelected,
  deleteSelectedElement
} = canvasSlice.actions;
export const canvasReducer = canvasSlice.reducer;
