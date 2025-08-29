import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import { Button } from "../ui/button";
import ProductSearchInput from "./productSearchInput";
import ProductStatusFilter from "./productStatusFilter";
import {
  clearAllProductFilter,
  selectStatus,
  selectWarehouseSelect,
} from "@/redux/slice/productTableFilterslice";
import { X } from "lucide-react";
import ProductWarehouseFilter from "./productWarehouseFilter";

export function DataTableFilter({
  refetch,
}: {
  refetch: (variables: { [key: string]: any }) => void;
}) {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const warehouse = useAppSelector(selectWarehouseSelect);

  const handleReset = () => {
    dispatch(clearAllProductFilter());
    refetch({});
  };

  return (
    <div className="flex space-x-4">
      <ProductSearchInput />
      <ProductStatusFilter refetch={refetch} />
      <ProductWarehouseFilter refetch={refetch} />
      {(status || warehouse) && (
        <Button
          variant="ghost"
          onClick={handleReset}
          className="flex items-center space-x-2"
        >
          Reset <X className="ml-1 size-4" />
        </Button>
      )}
    </div>
  );
}
