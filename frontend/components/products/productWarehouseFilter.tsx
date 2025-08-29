"use client";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Factory } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  setWarehouseSelect,
  selectWarehouseSelect,
  clearWarehouseSelect,
} from "@/redux/slice/productTableFilterslice";
import { useQuery } from "@apollo/client/react";
import { GET_WAREHOUSES } from "@/gql/queries/query";
import { Skeleton } from "../ui/skeleton";
import GlobalError from "../error/GlobalError";

type Warehouse = {
  code: string;
  name: string;
};

const ProductWarehouseFilter = ({
  refetch,
}: {
  refetch: (variables: { [key: string]: any }) => void;
}) => {
  const [open, setOpen] = useState(false);
  const warehouse = useAppSelector(selectWarehouseSelect);
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery<{ warehouses: Warehouse[] }>(
    GET_WAREHOUSES
  );

  useEffect(() => {
    if (warehouse) {
      refetch({ warehouse });
    } else {
      refetch({});
    }
  }, [warehouse, refetch]);

  const handleSelect = (selected: string) => {
    if (warehouse === selected) {
      dispatch(clearWarehouseSelect());
    } else {
      dispatch(setWarehouseSelect(selected));
    }
    setOpen(false);
  };

  if (error) return <GlobalError icon />;
  if (loading || !data?.warehouses) return <Skeleton className="h-10 w-44" />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="dashed" role="combobox" aria-expanded={open}>
          <Factory className="size-4" />
          {warehouse
            ? data.warehouses.find((s) => s.code === warehouse)?.name
            : "Warehouse"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search warehouse..." className="h-9" />
          <CommandList>
            <CommandEmpty>No warehouse found.</CommandEmpty>
            <CommandGroup>
              {data.warehouses.map((s) => (
                <CommandItem
                  key={s.code}
                  value={s.code}
                  onSelect={() => handleSelect(s.code)}
                >
                  <Checkbox
                    onClick={(e) => e.stopPropagation()}
                    checked={warehouse === s.code}
                    className="mr-2"
                  />
                  {s.name}
                  <CommandShortcut>{s.code}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProductWarehouseFilter;
