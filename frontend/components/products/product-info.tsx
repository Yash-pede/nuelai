"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GET_WAREHOUSES } from "@/gql/queries/query";
import { useMutation, useQuery } from "@apollo/client/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { UPDATE_PRODUCT_DEMAND } from "@/gql/mutations/mutation";
import { Loader2 as Loader2Icon } from "lucide-react";
import type { Products } from "@/types/products";
import GlobalError from "../error/GlobalError";

type Warehouse = { code: string; name: string };

export default function ProductInfoSheet({
  open,
  setOpen,
  product,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Products | null;
}) {
  const [demand, setDemand] = useState<string>("");
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");

  useEffect(() => {
    if (product) {
      setDemand(String(product.demand ?? ""));
      setSelectedWarehouse(product.warehouse ?? "");
    }
  }, [product?.id]);

  const { data, loading, error } = useQuery<{ warehouses: Warehouse[] }>(
    GET_WAREHOUSES
  );

  const [updateDemand, { loading: updating, error: updateError }] = useMutation(
    UPDATE_PRODUCT_DEMAND,
    {
      onCompleted: () => {
        setOpen(false);
      },
    }
  );

  const handleSave = async () => {
    if (!product) return;
    const parsed = parseInt(demand, 10);
    if (Number.isNaN(parsed)) {
      alert("Please enter a valid demand number");
      return;
    }

    try {
      await updateDemand({ variables: { id: product.id, demand: parsed } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>Product Details</SheetTitle>
          <SheetDescription>
            Review product information. Make changes and save when done.
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4 py-6">
          <div className="grid gap-3">
            <Label htmlFor="product-id">Product ID</Label>
            <Input id="product-id" value={product?.id ?? ""} readOnly />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="product-name">Name</Label>
            <Input id="product-name" value={product?.name ?? ""} readOnly />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="product-sku">SKU</Label>
            <Input id="product-sku" value={product?.sku ?? ""} readOnly />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="product-warehouse">Warehouse</Label>

            {loading ? (
              <Skeleton className="h-10 w-full" />
            ) : error ? (
              <GlobalError icon />
            ) : (
              <Select
                value={selectedWarehouse}
                onValueChange={setSelectedWarehouse}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {data?.warehouses.map((w) => (
                    <SelectItem
                      key={w.code}
                      value={w.code}
                      className="flex justify-between items-center"
                    >
                      <span className="truncate mr-2 max-w-[70%]">
                        {w.name}
                      </span>
                      <Badge>{w.code}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="product-stock">Stock</Label>
            <Input
              id="product-stock"
              value={String(product?.stock ?? "")}
              readOnly
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="product-demand">Demand</Label>
            <Input
              autoFocus
              id="product-demand"
              type="number"
              value={demand}
              onChange={(e) => setDemand(e.target.value)}
              placeholder="Enter demand"
            />
          </div>

          {updateError && (
            <div className="text-destructive">Error updating demand.</div>
          )}
        </div>

        <SheetFooter>
          <Button
            type="button"
            disabled={updating}
            onClick={handleSave}
            className="mr-2"
          >
            {updating ? (
              <>
                <Loader2Icon className="animate-spin mr-2" /> Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>

          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
