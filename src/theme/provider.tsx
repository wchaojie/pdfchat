"use client"
import { ReactNode, useMemo } from "react"
import { CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles"

import palette from "@/theme/palette"
import typography from "@/theme/typography"
import breakpoints from "@/theme/breakpoints"
import componentsOverride from "@/theme/overrides"
import { customShadows, shadows } from "@/theme/shadows"
import { ThemeOptions } from "@mui/material/styles/createThemeNoVars"
import { CssVarsThemeOptions } from "@mui/material/styles/createThemeWithVars"

// ----------------------------------------------------------------------

type MuiThemeOptions = Omit<ThemeOptions, "components"> &
  Pick<CssVarsThemeOptions, "defaultColorScheme" | "colorSchemes" | "components"> & {
    cssVariables?:
      | boolean
      | Pick<
          CssVarsThemeOptions,
          | "colorSchemeSelector"
          | "disableCssColorScheme"
          | "cssVarPrefix"
          | "shouldSkipGeneratingVar"
        >
  }

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // 自定义主题选项
  const themeOptions = useMemo(
    () => ({
      palette, // 调色板
      shape: { borderRadius: 4 }, // 圆角 4px
      spacing: 8, // 间距
      typography, // 字体
      breakpoints, // 断点
      shadows, // 阴影
      customShadows, // 自定义阴影
      cssVariables: true,
    }),
    []
  )

  // 通过接收的选项生成一个主题基础
  const theme = createTheme(themeOptions as MuiThemeOptions)
  // 默认组件覆盖
  theme.components = componentsOverride(theme)

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
