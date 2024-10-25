import { ReactNode } from "react"
import { styled } from "@mui/material/styles"
import {
  Backdrop,
  Box,
  CircularProgress,
  Stack,
  StackProps,
  SxProps,
  Typography,
} from "@mui/material"
import helper from "@/utils/helper"

// ----------------------------------------------------------------------

const FullPage = styled(Box)(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}))

export const FullPageLoading = () => (
  <FullPage>
    <CircularProgress />
  </FullPage>
)

// 全屏背景加载
export const BackdropLoading = ({ open }: { open: boolean }) => {
  return (
    <Backdrop
      sx={{ color: "primary.light", zIndex: theme => theme.zIndex.drawer + 1 }}
      open={open}
      // onClick={handleClose}
    >
      <CircularProgress color={"inherit"} />
    </Backdrop>
  )
}

// 加载包装器
interface LoadingWrapperProps extends StackProps {
  loading: boolean
  children: ReactNode
  sx?: SxProps
}
export const LoadingWrapper = (props: LoadingWrapperProps) => {
  const { loading, children, sx, ...stackPros } = props
  return (
    <Stack
      position={"relative"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ ...sx }}
      {...stackPros}
    >
      <Box sx={{ filter: `blur(${loading ? 1 : 0}px)`, opacity: loading ? 0.8 : 1 }}>
        {children}
      </Box>
      {loading && (
        <Box position={"absolute"}>
          <CircularProgress color={"primary"} />
        </Box>
      )}
    </Stack>
  )
}

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (helper.isError(error)) {
    return (
      <Typography color={"error.main"} align={"center"}>
        Error: {error?.message}
      </Typography>
    )
  }
  return null
}

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <ErrorBox error={error} />
  </FullPage>
)

export const FullBackground = styled(Box)<{
  bgimg?: string | null
}>`
  height: 100%;
  width: 100%;
  background-size: cover;
  //background-size: 100% auto; // xpos, ypos
  background-repeat: no-repeat;
  background-position: center center; // xpos, ypos
  background-image: url(${props => props.bgimg || "none"});
`
