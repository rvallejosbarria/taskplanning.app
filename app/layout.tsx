import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import Provider from "@/components/Provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
