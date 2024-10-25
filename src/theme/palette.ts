import { alpha } from "@mui/material/styles"

// ----------------------------------------------------------------------

declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter: string
    light: string
    main: string
    dark: string
    darker: string
    contrastText: string
  }
}

// ----------------------------------------------------------------------

const createGradient = (color1: string, color2: string) =>
  `linear-gradient(to bottom, ${color1}, ${color2})`

// COLORS
const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#9C9C9C",
  600: "#505050",
  700: "#3A3C38",
  800: "#282828",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
}

const PRIMARY = {
  lighter: "#F8F7F1",
  light: "#F0EBE1",
  main: "#CEB49C",
  dark: "#744100",
  darker: "#282631",
  contrastText: "#FFF",
}

const SECONDARY = {
  // lighter: "#B59F7B",
  lighter: "#FFFFE3",
  light: "#DFB666",
  main: "#D9C8AC",
  dark: "#898072",
  darker: "#866057",
  contrastText: "#FFF",
}

const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
  contrastText: "#FFF",
}

const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: GREY[800],
}

const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
  contrastText: GREY[800],
}

const ERROR = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#D22732",
  dark: "#B72136",
  darker: "#7A0C2E",
  contrastText: "#FFF",
}

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
}

const CHART_COLORS = {
  violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"],
  blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"],
  green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"],
  yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6"],
  red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"],
}

const palette = {
  common: { black: "#000", white: "#FFF" },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: "#58554F",
  text: {
    primary: "#363636",
    secondary: "#736C57",
    third: "#848484",
    disabled: GREY[500],
  },
  background: {
    paper: "#F8F6F0",
    default: "#FFFFFF",
    auth: "#FEFEFE",
    account: "#F8F7F1",
  },
  action: {
    active: GREY[600],
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  contrastThreshold: 3, // 对比度阈值，默认：3
  tonalOffset: 0.2, // 色调偏移，默认 0.2
}

export default palette
