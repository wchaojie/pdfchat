import { ThemeOptions } from "@mui/material"

// ----------------------------------------------------------------------

export default function Input(theme: ThemeOptions) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: theme.palette?.primary?.main,
          },
          "&:hover fieldset": {
            border: "2px solid #CEB499" + "!important",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#B18861",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 8,
          marginLeft: 0,
          fontSize: "1.4rem",
          color: theme.palette?.primary?.main,
        },
      },
    },
  }
}
