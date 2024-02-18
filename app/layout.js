"use client";
import { Inter } from "next/font/google";
import { SWRConfig } from "swr";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";
import "@fontsource/inter";
import "atropos/css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "./style/global.css"
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider
          defaultColorScheme="dark"
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications />
          <SWRConfig>
            <SessionProvider>{children}</SessionProvider>
          </SWRConfig>
        </MantineProvider>
      </body>
    </html>
  );
}
