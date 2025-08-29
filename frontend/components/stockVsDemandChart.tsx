"use client";

import { useId } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Rectangle,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { CustomTooltipContent } from "@/components/customTooltip";
import { Badge } from "@/components/ui/badge";
import { useDateRange } from "@/context/dateRangeContext";
import { differenceInDays, format, parseISO } from "date-fns";
import { useQuery } from "@apollo/client/react";
import { GET_STOCK_DEMAND_DATE } from "@/gql/queries/query";
import { SkeletonCard } from "./loading/CardLoading";
import CardError from "./error/cardError";

const chartConfig = {
  stock: {
    label: "Stock",
    color: "var(--chart-1)",
  },
  demand: {
    label: "Demand",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface CustomCursorProps {
  fill?: string;
  pointerEvents?: string;
  height?: number;
  points?: Array<{ x: number; y: number }>;
  className?: string;
}

function CustomCursor(props: CustomCursorProps) {
  const { fill, pointerEvents, height, points, className } = props;

  if (!points || points.length === 0) {
    return null;
  }

  const { x, y } = points[0]!;
  return (
    <>
      <Rectangle
        x={x - 12}
        y={y}
        fill={fill}
        pointerEvents={pointerEvents}
        width={24}
        height={height}
        className={className}
        type="linear"
      />
      <Rectangle
        x={x - 1}
        y={y}
        fill={fill}
        pointerEvents={pointerEvents}
        width={1}
        height={height}
        className="recharts-tooltip-inner-cursor"
        type="linear"
      />
    </>
  );
}

export function StockVsDemandChart() {
  const id = useId();
  const { from, to } = useDateRange();
  const { loading, error, data } = useQuery<{
    kpis: { stock: number; demand: number; date: string }[];
  }>(GET_STOCK_DEMAND_DATE, {
    variables: { from, to },
  });

  if (loading) return <SkeletonCard />;
  if (error) return <CardError />;

  const dateFormat = (() => {
    if (!from || !to) return "MMM d";

    const diff = differenceInDays(to, from);

    if (diff <= 31) return "MMM d";
    if (diff <= 180) return "MMM";
    return "yyyy MMM";
  })();

  return (
    <Card className="gap-4">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <CardTitle>Stock and demand</CardTitle>
            <div className="flex items-start gap-2">
              <div className="font-semibold text-2xl">
                {data?.kpis[data.kpis.length - 1]?.stock}
              </div>
              <Badge className="mt-1.5 bg-emerald-500/24 text-emerald-500 border-none">
                +24.7%
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-xs bg-chart-1"
              ></div>
              <div className="text-[13px]/3 text-muted-foreground/50">
                Stock
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-xs bg-chart-3"
              ></div>
              <div className="text-[13px]/3 text-muted-foreground/50">
                Demand
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-60 w-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-(--chart-1)/15 [&_.recharts-rectangle.recharts-tooltip-inner-cursor]:fill-white/20"
        >
          <LineChart
            accessibilityLayer
            data={data?.kpis}
            margin={{ left: -12, right: 12, top: 12 }}
          >
            <defs>
              <linearGradient id={`${id}-gradient`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--chart-2)" />
                <stop offset="100%" stopColor="var(--chart-1)" />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="2 2"
              stroke="var(--border)"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={12}
              tickFormatter={(value) => format(parseISO(value), dateFormat)}
              stroke="var(--border)"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <Line
              type="linear"
              dataKey="demand"
              stroke="var(--color-demand)"
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
            <ChartTooltip
              content={
                <CustomTooltipContent
                  colorMap={{
                    stock: "var(--chart-1)",
                    demand: "var(--chart-3)",
                  }}
                  labelMap={{
                    stock: "Stock",
                    demand: "Demand",
                  }}
                  dataKeys={["stock", "demand"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                />
              }
              cursor={<CustomCursor fill="var(--chart-1)" />}
            />
            <Line
              type="linear"
              dataKey="stock"
              stroke={`url(#${id}-gradient)`}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 5,
                fill: "var(--chart-1)",
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
