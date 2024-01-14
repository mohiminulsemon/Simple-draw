import { createSlice } from '@reduxjs/toolkit';
import { sliceKeys } from '../utils/keys';

// ==============================|| states ||============================== //
const initialState = {
  templates: [],
  selectedTemplate: {},
  isTemplateDetailModalOpen: false
};

// ==============================|| slice ||============================== //
export const templateSlice = createSlice({
  name: sliceKeys.template,
  initialState,
  reducers: {
    updateTemplates: (state, action) => {
      state.templates = [];
      action.payload.map((data) => {
        const templatData = JSON.parse(data);
        templatData.thumbnail = 'data:image/jpeg;base64,' + templatData.thumbnail;
        // console.log(templatData);
        state.templates.push(templatData);
      });
    },
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    openTemplateDetailModal: (state) => {
      state.isTemplateDetailModalOpen = true;
    },
    closeTemplateDetailModal: (state) => {
      state.isTemplateDetailModalOpen = false;
    }
  }
});

export const {
  updateTemplates,
  setSelectedTemplate,
  openTemplateDetailModal,
  closeTemplateDetailModal
} = templateSlice.actions;
export const templateReducer = templateSlice.reducer;
