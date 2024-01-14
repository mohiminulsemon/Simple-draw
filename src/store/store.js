import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';

// slice reducers
import { appReducer } from '../features/appSlice';
import { authReducer } from '../features/authSlice';
import { templateReducer } from '../features/templateSlice';
import { projectReducer } from '../features/projectSlice';
import { canvasReducer } from '../features/canvasSlice';

// services
import { authApi } from '../services/authApi';
import { templateApi } from '../services/templateApi';
import { projectApi } from '../services/projectApi';

// ==============================|| persist reducer ||============================== //
const persistConfig = {
  key: 'root',
  storage: storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_PERSIST_ENCRYPT_KEY,
      onError: function (error) {
        // Handle the error.
        console.log('persist encrypt transform error', error);
      }
    })
  ]
};

const rootReducer = combineReducers({
  appReducer,
  authReducer,
  canvasReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ==============================|| store ||============================== //
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [templateApi.reducerPath]: templateApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,

    templateReducer,
    projectReducer,

    persist: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([authApi.middleware, templateApi.middleware, projectApi.middleware])
});

export const persistor = persistStore(store);
