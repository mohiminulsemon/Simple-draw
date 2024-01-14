import { createSlice } from '@reduxjs/toolkit';
import { sliceKeys } from '../utils/keys';

// ==============================|| states ||============================== //
const initialState = {
  projects: [],
  isCreateProjectModalOpen: false
};

// ==============================|| slice ||============================== //
export const projectSlice = createSlice({
  name: sliceKeys.project,
  initialState,
  reducers: {
    updateProjects: (state, action) => {
      state.projects = [];
      action.payload.map((data) => {
        const contentJson = JSON.parse(data.content);
        const project = {
          canvas: contentJson.canvas,
          data: contentJson.data,
          name: contentJson.name,
          thumbnail: 'data:image/jpeg;base64,' + contentJson.thumbnail,
          userName: contentJson.userName,
          creationTime: data.creationTime
        };
        state.projects.push(project);
        // console.log(project);
      });
    },
    openCreateProjectModal: (state) => {
      state.isCreateProjectModalOpen = true;
    },
    closeCreateProjectModal: (state) => {
      state.isCreateProjectModalOpen = false;
    }
  }
});

export const { updateProjects, openCreateProjectModal, closeCreateProjectModal } =
  projectSlice.actions;
export const projectReducer = projectSlice.reducer;
