import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function CardError({ message }: { message?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error</CardTitle>
        <CardDescription>
          {message || "An unexpected error occurred."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Please try again later or contact support if the issue persists.</p>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
