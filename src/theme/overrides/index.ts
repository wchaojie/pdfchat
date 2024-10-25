import { ThemeOptions } from "@mui/material"

import CssBaseline from "./CssBaseline"
import Button from "./Button"
import Input from "./Input"

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: ThemeOptions) {
  return Object.assign(CssBaseline(theme), Button(theme), Input(theme))
}
