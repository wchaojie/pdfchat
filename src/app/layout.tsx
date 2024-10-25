import { ReactNode } from "react"
import type { Metadata } from "next"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"

import { ThemeProvider } from "@/theme/provider"
import BaseLayout from "@/layouts/BaseLayout"
import "@/app/globals.css"

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: process.env.SITE_NAME,
  description: "Website description",
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <BaseLayout>{children}</BaseLayout>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
