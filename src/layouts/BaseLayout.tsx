"use client"
import { PropsWithChildren } from "react"
import { styled } from "@mui/material/styles"
import { Box, SxProps, Theme } from "@mui/material"

// ----------------------------------------------------------------------

type BaseLayoutProps = {
  bgImg?: string
  bgColor?: string
  sx?: SxProps<Theme>
}
export default function BaseLayout({
  bgImg,
  bgColor,
  sx,
  children,
}: PropsWithChildren<BaseLayoutProps>) {
  return (
    <BaseLayoutStyled bgimg={bgImg} bgcolor={bgColor} sx={sx}>
      {children}
    </BaseLayoutStyled>
  )
}

// ----------------------------------------------------------------------

const BaseLayoutStyled = styled(Box)<{
  bgimg?: string
  bgcolor?: string
}>(({ bgimg, bgcolor }) => ({
  position: "relative", // 相对定位
  margin: "0 auto", // 居中
  width: "100vw", // 宽度
  // height: "100%", // 高度
  // minHeight: app.minHeight, // 最小高度
  // maxWidth: theme.breakpoints.values.tablet, // 最大宽度
  // maxWidth: app.maxWidth, // 最大宽度
  // maxHeight: app.maxHeight, // 最大高度
  background: bgimg ? `url(${bgimg}) center top no-repeat` : "transparent",
  backgroundColor: bgcolor || "transparent",
}))
