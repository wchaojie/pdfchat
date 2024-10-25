import { ThemeOptions } from "@mui/material"
import app from "@/configs/app"

// ----------------------------------------------------------------------

export default function CssBaseline(theme: ThemeOptions) {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          margin: 0,
          padding: 0,
          "&:focus": {
            outline: "none",
          },
          boxSizing: "border-box",
          WebkitBoxSizing: "border-box",
          WebkitTapHighlightColor: "transparent", // 当用户点击 iOS 的 Safari 浏览器中的链接或 JavaScript 的可点击的元素时，覆盖显示的高亮颜色
        },
        html: {
          width: "100%",
          height: "100%",
          fontSize: "62.5%", // 16 * 62.5% = 10px
          WebkitOverflowScrolling: "touch", // 属性控制元素在移动设备上是否使用滚动回弹效果
        },
        body: {
          width: "100%",
          height: "100%",
          minWidth: app.minWidth,
          overflowX: "hidden",
          backgroundColor: theme.palette?.background?.default, // 背景颜色
        },
        "#root": {
          width: "100%",
          height: "100%",
        },
        a: {
          textDecoration: "none", // 清楚下划线
          WebkitTouchCallout: "none", // 禁用长按弹出菜单
        },
        img: {
          display: "block",
          maxWidth: "100%",
          WebkitTouchCallout: "none", // 禁用长按弹出菜单
        },
        input: {
          "&[type=number]": {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
            "&::-webkit-inner-spin-button": {
              margin: 0,
              WebkitAppearance: "none",
            },
          },
        },
        ".read-write": {
          WebkitUserModify: "read-write-plaintext-only", // 标签可以编辑.
        },
        ".debug": {
          outline: "1px solid red",
        },
      },
    },
  }
}
