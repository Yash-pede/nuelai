"use client"
import { IconTrendingUp } from "@tabler/icons-react";
import { useQuery } from "@apollo/client/react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GET_TOTAL_STOCK } from "@/gql/queries/query";
import CardError from "@/components/error/cardError";
import { SkeletonCard } from "@/components/loading/CardLoading";
import { useDateRange } from "@/context/dateRangeContext";

export default function TotalStock() {
  const { from, to } = useDateRange();
  const { loading, error, data } = useQuery<{ kpis: { stock: number }[] }>(
    GET_TOTAL_STOCK,
    {
      variables: { from, to },
    }
  );

  if (error) return <CardError />;
  if (loading || !data) return <SkeletonCard />;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>Total Stock</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {data?.kpis.reduce((acc, curr) => acc + curr.stock, 0)}
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
          Trending up this month <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Stock levels are healthy</div>
      </CardFooter>
    </Card>
  );
}
