import { ReactNode } from "react";

export default function DashboardLayout({ children }): ReactNode {
  return (
    <div className="dashboard-wrapper min-h-screen bg-gray-50">{children}</div>
  );
}
