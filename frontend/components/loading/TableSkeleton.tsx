import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SkeletonTable() {
  return (
    <TableBody>
      {[...Array(9)].map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-10 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-10 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-10 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-10 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-10 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-10 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-10 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-10 w-full" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
