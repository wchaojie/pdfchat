import { Box, BoxProps, SxProps } from "@mui/material"

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  src: string
  size?: StrNum
  onClick?: (event: any) => void // 可以使用 (event as MouseEvent).stopPropagation() 来阻止冒泡
  verticalFlip?: boolean
  horizontalFlip?: boolean
  sx?: SxProps
}
export default function IconImg(props: Props) {
  const { src, size, onClick, horizontalFlip, verticalFlip, sx, ...boxProps } = props

  let flip = "none"
  if (horizontalFlip) {
    flip = "rotateY(180deg)"
  }
  if (verticalFlip) {
    flip = `${flip} rotateX(180deg)`
  }

  return (
    <Box
      src={src}
      width={size}
      component={"img"}
      onClick={onClick}
      draggable={false} // 禁止拖拽
      sx={{
        // display: "inline-block",
        // mask: `url(${src}) no-repeat center / contain`,
        // WebkitMask: `url(${src}) no-repeat center / contain`,
        transform: flip,
        "&:hover": {
          cursor: onClick && "pointer",
        },
        ...sx,
      }}
      {...boxProps} // 其他继承下来的属性
    />
  )
}
