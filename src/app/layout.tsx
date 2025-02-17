import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./AppProvider";
import AuthContext from "@/context/authContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ti3Live",
  description: "Let's Live streaming using 3d models and automate with ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-Archivo">
      {/* <AuthContext> */}
      <AppProvider>
        <body className={inter.className}>{children}</body>
      </AppProvider>
      {/* </AuthContext> */}

    </html>
  );
}
