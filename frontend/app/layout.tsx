import type { Metadata } from "next";
import { ReactNode } from "react";
import { AuthProvider } from "@/app/context/AuthContext";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "CargoPilot",
  description: "Modern delivery software",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
