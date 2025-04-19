import NonDashboardNavbar from "@/components/NonDashboardNavbar";
import Footer from "@/components/Footer";
import React from "react";

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NonDashboardNavbar />
      <main className="flex-grow py-6 md:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}