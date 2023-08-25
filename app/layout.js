"use client";
import { Inter } from "next/font/google";
import { SWRConfig } from "swr";
import {  MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "atropos/css";
import "./globals.css";
import RootStyleRegistry from "./emotion";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return ( 
    <html lang="en-US">
      <head />
      <body className={inter.className}>
        <RootStyleRegistry>
          <MantineProvider
            theme={{ colorScheme: "dark" }}
            withGlobalStyles
            withNormalizeCSS
          >
            <Notifications />
            <SWRConfig>{children}</SWRConfig>
          </MantineProvider>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
