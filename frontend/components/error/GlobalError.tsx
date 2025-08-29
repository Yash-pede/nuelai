import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const GlobalError = ({
  className,
  icon,
}: {
  className?: string;
  icon?: boolean;
}) => {
  if (icon)
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="destructive">
            <AlertCircleIcon /> Error
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Please retry later</p>
        </TooltipContent>
      </Tooltip>
    );
  return (
    <Alert variant="destructive" className={cn("p-4 my-4", className)}>
      <AlertCircleIcon />
      <AlertTitle>There was a Error in this component</AlertTitle>
      <AlertDescription>
        <p>Please verify you are connected to the internet.</p>
      </AlertDescription>
    </Alert>
  );
};

export default GlobalError;
