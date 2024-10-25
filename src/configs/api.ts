import app from "./app"

// ----------------------------------------------------------------------

const apiConfig = {
  tokenKey: "token",
  timeout: (app.devEnv ? 120 : 30) * 1000, // Milliseconds
  baseURL: `${process.env.APP_API_URL}/api/${process.env.APP_API_VER}`,
}

export default apiConfig
