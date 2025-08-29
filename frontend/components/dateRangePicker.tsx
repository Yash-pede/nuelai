"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useDateRange } from "@/context/dateRangeContext";

export default function DatePicker() {

  const { from, to, setDateRange } = useDateRange();

  const today = new Date();
  const predefinedRanges = {
    today: { from: today, to: today },
    yesterday: { from: subDays(today, 1), to: subDays(today, 1) },
    last7Days: { from: subDays(today, 6), to: today },
    last14Days: { from: subDays(today, 13), to: today },
    last30Days: { from: subDays(today, 29), to: today },
    monthToDate: { from: startOfMonth(today), to: today },
    lastMonth: {
      from: startOfMonth(subMonths(today, 1)),
      to: endOfMonth(subMonths(today, 1)),
    },
    yearToDate: { from: startOfYear(today), to: today },
    lastYear: {
      from: startOfYear(subYears(today, 1)),
      to: endOfYear(subYears(today, 1)),
    },
  };

  const [month, setMonth] = useState(today);

  return (
    <div className="*:not-first:mt-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start min-w-62">
            <CalendarIcon
              size={16}
              className="opacity-40 -ms-1 group-hover:text-foreground shrink-0 transition-colors"
              aria-hidden="true"
            />
            <span className={cn("truncate", !from && "text-muted-foreground")}>
              {from ? (
                to ? (
                  <>
                    {format(from, "LLL dd, y")} - {format(to, "LLL dd, y")}
                  </>
                ) : (
                  format(from, "LLL dd, y")
                )
              ) : (
                "Pick a date range"
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="flex max-sm:flex-col">
            <div className="relative py-4 max-sm:order-1 max-sm:border-t sm:w-32">
              <div className="h-full sm:border-e">
                <div className="flex flex-col px-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setDateRange({
                        from: today,
                        to: today,
                      });
                      setMonth(today);
                    }}
                  >
                    Today
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setDateRange(predefinedRanges.yesterday);
                      setMonth(predefinedRanges.yesterday.to);
                    }}
                  >
                    Yesterday
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setDateRange(predefinedRanges.last7Days);
                      setMonth(predefinedRanges.last7Days.to);
                    }}
                  >
                    Last 7 days
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setDateRange(predefinedRanges.last14Days);
                      setMonth(predefinedRanges.last14Days.to);
                    }}
                  >
                    Last 14 days
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setDateRange(predefinedRanges.last30Days);
                      setMonth(predefinedRanges.last30Days.to);
                    }}
                  >
                    Last 30 days
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setDateRange(predefinedRanges.monthToDate);
                      setMonth(predefinedRanges.monthToDate.to);
                    }}
                  >
                    Month to date
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setDateRange(predefinedRanges.lastMonth);
                      setMonth(predefinedRanges.lastMonth.to);
                    }}
                  >
                    Last month
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setDateRange(predefinedRanges.yearToDate);
                      setMonth(predefinedRanges.yearToDate.to);
                    }}
                  >
                    Year to date
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setDateRange(predefinedRanges.lastYear);
                      setMonth(predefinedRanges.lastYear.to);
                    }}
                  >
                    Last year
                  </Button>
                </div>
              </div>
            </div>
            <Calendar
              mode="range"
              selected={{ from, to }}
              onSelect={(newDate) => {
                if (newDate) {
                  setDateRange(newDate);
                }
              }}
              month={month}
              onMonthChange={setMonth}
              className="p-2"
              disabled={[{ after: today }]}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
