import { ReactNode } from "react"
import { Stack, StackProps, SxProps, Typography, TypographyVariant } from "@mui/material"

// Icons
import IconImg from "@/components/IconImg"

// ----------------------------------------------------------------------

interface Props extends StackProps {
  text: string
  textColor?: string
  textVariant?: TypographyVariant
  fontSize?: StrNum
  fontFamily?: string
  letterSpacing?: StrNum
  width?: StrNum
  height?: StrNum
  icon?: string
  iconSize?: StrNum
  bgIcon?: string
  onClick?: () => void
  disabled?: boolean
  extraNode?: ReactNode
  sx?: SxProps
}
export default function ButtonImg(props: Props) {
  const {
    text,
    textColor,
    textVariant,
    fontSize,
    fontFamily,
    letterSpacing,
    width,
    height,
    icon,
    iconSize,
    bgIcon,
    disabled,
    onClick,
    extraNode,
    sx,
    ...stackProps
  } = props
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      onClick={onClick}
      my={1}
      sx={{
        width: width || 1,
        height: height || "4.4rem",
        background: `url(${bgIcon}) center center/contain no-repeat`,
        opacity: disabled ? 0.5 : 1,
        "&:hover": {
          cursor: onClick && "pointer",
        },
        ...sx,
      }}
      {...stackProps} // 其他继承下来的属性
    >
      <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
        {icon && <IconImg size={iconSize} src={icon} />}
        <Typography
          variant={textVariant || "subtitle1"}
          color={textColor}
          fontSize={fontSize}
          fontFamily={fontFamily}
          letterSpacing={letterSpacing || 1}
        >
          {text}
        </Typography>
        {extraNode}
      </Stack>
    </Stack>
  )
}
