import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serviceKeys } from '../utils/keys';
import { apiRoutes } from '../utils/apiRoutes';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const projectApi = createApi({
  reducerPath: serviceKeys.project,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: apiRoutes.projects,
        method: 'GET'
      })
    })
  })
});

export const { useGetProjectsQuery } = projectApi;
