"use client";
import { IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDateRange } from "@/context/dateRangeContext";
import { useQuery } from "@apollo/client/react";
import { GET_STOCK_AND_DEMAND } from "@/gql/queries/query";
import { SkeletonCard } from "@/components/loading/CardLoading";
import CardError from "@/components/error/cardError";
export const FillRate = () => {
  const { from, to } = useDateRange();
  const { loading, error, data } = useQuery<{
    kpis: { stock: number; demand: number }[];
  }>(
   GET_STOCK_AND_DEMAND,
    {
      variables: { from, to },
    }
  );

  if (error) return <CardError />;
  if (loading || !data) return <SkeletonCard />;

  function calculateFillRate(data: {
    kpis: { stock: number; demand: number }[];
  }) {
    if (!data?.kpis?.length) return "0.00%";

    const totalMin = data.kpis.reduce((acc, curr) => {
      return acc + Math.min(curr.stock, curr.demand);
    }, 0);

    const totalDemand = data.kpis.reduce((acc, curr) => {
      return acc + curr.demand;
    }, 0);

    if (totalDemand === 0) return "0.00%";

    const fillRate = (totalMin / totalDemand) * 100;
    return `${fillRate.toFixed(2)}%`;
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Fill Rate</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {calculateFillRate(data)}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <IconTrendingUp />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Strong user retention <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Engagement exceed targets</div>
      </CardFooter>
    </Card>
  );
};
