import { maxIPhoneWidth } from "@/configs/app"

// ----------------------------------------------------------------------

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false // removes the `xs` breakpoint
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true // adds the `mobile` breakpoint
    tablet: true
    laptop: true
    desktop: true
  }
}

const breakpoints = {
  values: {
    mobile: 0,
    tablet: maxIPhoneWidth, // mobile device max width
    laptop: 1024,
    desktop: 1200,
  },
}

export default breakpoints
