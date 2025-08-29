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
import { Circle, PlusCircle } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";
import {
  selectStatus,
  setStatus,
  clearStatus,
} from "@/redux/slice/productTableFilterslice";

const ProductStatusFilter = ({
  refetch,
}: {
  refetch: (variables: { [key: string]: any }) => void;
}) => {
  const [open, setOpen] = useState(false);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  const statusOptions = [
    {
      value: "healthy",
      label: "Healthy",
      icon: <Circle className="fill-green-700 border-green-700" />,
    },
    {
      value: "low",
      label: "Low",
      icon: <Circle className="fill-yellow-400/90 border-yellow-400/90" />,
    },
    {
      value: "critical",
      label: "Critical",
      icon: <Circle className="fill-destructive border-destructive" />,
    },
  ];

  // refetch when redux status changes
  useEffect(() => {
    if (status) {
      refetch({ status });
    } else {
      refetch({});
    }
  }, [status, refetch]);

  const handleSelect = (selected: string) => {
    if (status === selected) {
      dispatch(clearStatus()); // ✅ only clear status
    } else {
      dispatch(setStatus(selected));
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="dashed" role="combobox" aria-expanded={open}>
          <PlusCircle className="size-4" />
          {status
            ? statusOptions.find((s) => s.value === status)?.label
            : "Status"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." className="h-9" />
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>
              {statusOptions.map((s) => (
                <CommandItem
                  key={s.value}
                  value={s.value}
                  onSelect={() => handleSelect(s.value)}
                >
                  <Checkbox
                    onClick={(e) => e.stopPropagation()}
                    checked={status === s.value}
                    className="mr-2"
                  />
                  {s.icon}
                  {s.label}
                  <CommandShortcut>{12}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProductStatusFilter;
