import { ThemeOptions } from "@mui/material"
import { alpha } from "@mui/material/styles"

// ----------------------------------------------------------------------

export default function Button(theme: ThemeOptions) {
  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // 禁止涟漪效果
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeLarge: {
          height: 48,
        },
        // containedInherit: {
        //   color: theme.palette.grey[800],
        //   boxShadow: theme.customShadows.z8,
        //   "&:hover": {
        //     backgroundColor: theme.palette.grey[400],
        //   },
        // },
        // containedPrimary: {
        //   boxShadow: theme.customShadows.primary,
        // },
        // containedSecondary: {
        //   boxShadow: theme.customShadows.secondary,
        // },
        // outlinedInherit: {
        //   border: `1px solid ${theme.palette.grey[500_32]}`,
        //   "&:hover": {
        //     backgroundColor: theme.palette.action.hover,
        //   },
        // },
        // textInherit: {
        //   "&:hover": {
        //     backgroundColor: theme.palette.action.hover,
        //   },
        // },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          padding: 8,
          color: "#9D6A3A",
          // border: "1px solid " + theme.palette?.primary?.main,
          "&:hover": {
            backgroundColor: alpha("#E7C88C", 0.6),
          },
          "&.Mui-selected": {
            color: "#744100",
            backgroundColor: "#E7C88C" + "!important",
          },
        },
      },
    },
  }
}
