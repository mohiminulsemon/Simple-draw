import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serviceKeys } from '../utils/keys';
import { apiRoutes } from '../utils/apiRoutes';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const templateApi = createApi({
  reducerPath: serviceKeys.template,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTemplates: builder.query({
      query: () => ({
        url: apiRoutes.templates,
        method: 'GET'
      })
    })
  })
});

export const { useGetTemplatesQuery } = templateApi;
