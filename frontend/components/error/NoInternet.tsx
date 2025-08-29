"use client";

import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { WifiOff, RefreshCw } from "lucide-react";

const NoInternetConnection = ({ children }: { children: React.ReactNode }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) {
    return children;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/30 px-4">
      <Alert variant="destructive" className="max-w-md text-center">
        <div className="flex justify-center mb-4">
          <WifiOff className="h-12 w-12 text-red-500" />
        </div>
        <AlertTitle className="text-xl font-semibold">
          No Internet Connection
        </AlertTitle>
        <AlertDescription className="mt-2">
          Please check your network connection and try again.
        </AlertDescription>
      </Alert>
      <div className="mt-6 flex justify-center">
        <Button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reload Page
        </Button>
      </div>
    </div>
  );
};

export default NoInternetConnection;
