import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 flex-col @container/main gap-2">{children}</div>
  );
};

export default DashboardLayout;
