import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { DateRange } from "react-day-picker";
import { subDays } from "date-fns";

const initialState: DateRange = {
  from: subDays(new Date(), 6),
  to: new Date(),
};

const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState,
  reducers: {
    setRange: (state, action: PayloadAction<DateRange>) => {
      state.from = action.payload.from;
      state.to = action.payload.to;
    },
    clearRange: (state) => {
      state.from = undefined;
      state.to = undefined;
    },
  },
});

export const { setRange, clearRange } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;

export const selectRange = (state: RootState) => state.dateRange;
