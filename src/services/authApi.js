import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serviceKeys } from '../utils/keys';
import { apiRoutes } from '../utils/apiRoutes';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const authApi = createApi({
  reducerPath: serviceKeys.auth,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (loginInfo) => ({
        url: apiRoutes.login,
        method: 'POST',
        body: loginInfo
      })
    })
  })
});

export const { useUserLoginMutation } = authApi;
