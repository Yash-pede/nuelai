"use client";
import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type SortingState,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnFiltersState,
  useReactTable,
  getFilteredRowModel,
  type VisibilityState,
  type Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Products } from "@/types/products";
import { DataTablePagination } from "../table/pagination";
import { DataTableViewOptions } from "../table/column-toggle";
import { DataTableFilter } from "./data-filter";
import SkeletonTable from "../loading/TableSkeleton";
import ProductInfoSheet from "./product-info";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  refetch: () => void;
  loading: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  refetch,
  loading,
}: DataTableProps<TData, TValue>) {
  const [selectedProduct, setSelectedProduct] = React.useState<Products | null>(
    null
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [open, setOpen] = React.useState<boolean>(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    meta: {
      getRowStyles: (row: Row<Products>): React.CSSProperties => ({
        background: row.original.stock < row.original.demand ? "#c100071a" : "",
      }),
    },
  });

  React.useEffect(() => {
    if (!open) {
      setSelectedProduct(null);
      refetch();
    }
  }, [open]);

  return (
    <div className="">
      <div className="flex items-center py-4  ">
        <DataTableFilter refetch={refetch} />
        <DataTableViewOptions table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {loading ? (
            <SkeletonTable />
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    style={table.options.meta?.getRowStyles(row)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(row.original as Products);
                      setOpen(true);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <DataTablePagination table={table} />
      <ProductInfoSheet
        open={open}
        setOpen={setOpen}
        product={selectedProduct}
      />
    </div>
  );
}
