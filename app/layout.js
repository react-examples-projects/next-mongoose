"use client";
import { Inter, Outfit } from "next/font/google";
import cls from "classnames";
import { SWRConfig } from "swr";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";
import "@fontsource/inter";
import "atropos/css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "./style/global.css";
const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <head>
        <ColorSchemeScript />
        <meta name="application-name" content="Next auth test" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Next auth test" />
        <meta name="description" content="Next auth testing app" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="/icon-256x256.png" />
        <link rel="apple-touch-icon" sizes="384x384" href="/icon-384x384.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icon-512x512.png" />

        <link rel="manifest" href="/manifest.json" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="Next auth test" />
        <meta name="twitter:description" content="Next auth testing app" />
        <meta name="twitter:image" content="https://yourdomain.com/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Next auth test" />
        <meta property="og:description" content="Next auth testing app" />
        <meta property="og:site_name" content="Next auth test" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="https://yourdomain.com/apple-touch-icon.png" />
      </head>
      <body className={cls(inter.className, outfit.className)}>
        <MantineProvider defaultColorScheme="dark" withGlobalStyles withNormalizeCSS>
          <Notifications />
          <SWRConfig>
            <SessionProvider>{children}</SessionProvider>
          </SWRConfig>
        </MantineProvider>
      </body>
    </html>
  );
}
