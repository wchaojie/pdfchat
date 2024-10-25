import pkg from "@/../package.json"
import helper from "@/utils/helper"

// ----------------------------------------------------------------------

const isDev = process.env.NODE_ENV === "development" // 是否开发

const appConfig = {
  // 环境
  devEnv: isDev, // 是否开发
  name: pkg.name, // 项目名称（首字母大写）
  version: pkg.version, // 项目版本
  verMinor: pkg.version.split(".").slice(0, 2).join("."), // 次要版本
  title: process.env.APP_NAME,

  // 系统
  uploadFileMaxSize: 1048576 * 5, // 最大文件上传限制 5MB
  uploadFileAccept: [".json"], // 接受上传文件的类型
  uploadImageAccept: [".jpg", ".png", ".jpeg", ".webp"], // 接受上传图片的类型
}

export default appConfig
