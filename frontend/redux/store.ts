import { configureStore } from "@reduxjs/toolkit";
import dateRangeReducer from "./slice/dateRangeSlice";
import productFilterReducer from "./slice/productTableFilterslice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      dateRange: dateRangeReducer,
      productFilter: productFilterReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // ⚠ disables warnings globally
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
