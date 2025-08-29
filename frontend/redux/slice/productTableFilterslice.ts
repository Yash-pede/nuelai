import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type ProductFilterState = {
  status: string;
  productSearch: string;
  WarehouseSelect: string;
};

const initialState: ProductFilterState = {
  status: "",
  productSearch: "",
  WarehouseSelect: "",
};

const productFilterSlice = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    clearStatus: (state) => {
      state.status = "";
    },
    setProductSearch: (state, action: PayloadAction<string>) => {
      state.productSearch = action.payload;
    },
    setWarehouseSelect: (state, action: PayloadAction<string>) => {
      state.WarehouseSelect = action.payload;
    },
    clearWarehouseSelect: (state) => {
      state.WarehouseSelect = "";
    },
    clearAllProductFilter: () => initialState,
  },
});

export const {
  setStatus,
  clearStatus,
  setProductSearch,
  setWarehouseSelect,
  clearAllProductFilter,
  clearWarehouseSelect,
} = productFilterSlice.actions;

export default productFilterSlice.reducer;

export const selectStatus = (state: RootState) => state.productFilter.status;
export const selectProductSearch = (state: RootState) =>
  state.productFilter.productSearch;
export const selectWarehouseSelect = (state: RootState) =>
  state.productFilter.WarehouseSelect;
