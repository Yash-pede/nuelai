"use client";

import { GET_PRODUCTS } from "@/gql/queries/query";
import { Products } from "@/types/products";
import { columns } from "../table/columns";
import { DataTable } from "./data-table";
import { useQuery } from "@apollo/client/react";
import { useAppSelector } from "@/hooks/redux-hook";
import {
  selectProductSearch,
  selectStatus,
  selectWarehouseSelect,
} from "@/redux/slice/productTableFilterslice";
import GlobalError from "../error/GlobalError";

export default function ProductsTable() {
  const status = useAppSelector(selectStatus);
  const search = useAppSelector(selectProductSearch);
  const warehouse = useAppSelector(selectWarehouseSelect);

  const { data, loading, error, refetch } = useQuery<{ products: Products[] }>(
    GET_PRODUCTS,
    {
      variables: {
        status,
        search,
        warehouse,
      },
    }
  );
  if (error) {
    console.error("Error fetching products:", error);
    return <GlobalError />;
  }

  return (
    <div className="mx-auto py-10">
      <DataTable
        loading={loading}
        columns={columns}
        data={data?.products || []}
        refetch={refetch}
      />
    </div>
  );
}
