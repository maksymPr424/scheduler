import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import planReducer from "../features/plans/planSlice";
import authReducer from "../features/auth/authSlice";
import filterReducer from "../features/filter/filterSlice";
import directionsReducer from "../features/directions/directionsSlice";

const rootReducer = combineReducers({
  plans: planReducer,
  auth: authReducer,
  filter: filterReducer,
  directions: directionsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["plans", "auth", "filter", "directions"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
