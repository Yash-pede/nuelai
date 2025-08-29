"use client";
import { subDays } from "date-fns";
import React, { createContext, useContext, useState } from "react";
import type { DateRange } from "react-day-picker";

type DateRangeContextType = DateRange & {
  setDateRange: (range: DateRange) => void;
};

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

export const DateRangeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [date, setDate] = useState<DateRange>(() => ({
    from: subDays(new Date(), 6),
    to: new Date(),
  }));

  const setDateRange = (range: DateRange) => {
    setDate(range);
  };

  return (
    <DateRangeContext.Provider
      value={{
        from: date?.from,
        to: date?.to,
        setDateRange,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};

export const useDateRange = (): DateRangeContextType => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
};
