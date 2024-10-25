export default {
  // 程序休眠
  sleep(time = 2) {
    return new Promise(resolve => setTimeout(resolve, time * 1000))
  },

  // 判断是否空对象
  isEmptyObject(obj: object) {
    return Object.prototype.isPrototypeOf(obj) && Reflect.ownKeys(obj).length === 0
  },

  // 类型守卫：value is Error(返回值)，函数实际类型为：isError(value: any): boolean
  isError(value: any): value is Error {
    return value?.message // 当 value 符合条件(value?.message is true)时 TS 才会把 value 当成 Error 类型
  },

  // 是否假的
  isFalsy(value: unknown): boolean {
    return value === 0 ? false : !value
  },

  // 无效值的
  isVoid(value: unknown): boolean {
    return value === undefined || value === null || value === ""
  },

  // 判断浏览器是否支持 webp
  isWebpSupported(): boolean {
    if (typeof document !== "object") return false
    const elem: HTMLCanvasElement = document.createElement("canvas")
    return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0
  },

  // 判断是否移动端
  isMobile(): boolean {
    return !!window.navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  },

  // 设备判断
  deviceDetermine() {
    const ua = window.navigator.userAgent

    const isWindowsPhone = /(?:Windows Phone)/i.test(ua)
    const isSymbian = /(?:SymbianOS)/i.test(ua) || isWindowsPhone
    const isChrome = /(?:Chrome|CriOS)/i.test(ua)
    const isAndroid = /(?:Android)/i.test(ua)
    const isFireFox = /(?:Firefox)/i.test(ua)
    const isTablet =
      /(?:iPad|PlayBook)/.test(ua) ||
      (isAndroid && !/(?:Mobile)/i.test(ua)) ||
      (isFireFox && /(?:Tablet)/i.test(ua))
    const isIPhone = /(?:iPhone)/i.test(ua) && !isTablet
    const isIPhoneX = isIPhone && window.screen.height >= 812 // 判断是否 iPhoneX 以上机型
    const isMobile = isWindowsPhone && isAndroid && isTablet && isIPhone // 是否移动设备，包括手机平板
    const isPc = !isIPhone && !isAndroid && !isSymbian

    return {
      isWindowsPhone,
      isSymbian,
      isFireFox,
      isChrome,
      isAndroid,
      isIPhone,
      isIPhoneX,
      isMobile,
      isTablet,
      isPc,
    } as const
  },

  // 判断是否为奇数
  isOdd(num: number): boolean {
    return num % 2 !== 0
  },

  // 判断是否为偶数
  isEven(num: number): boolean {
    return num % 2 === 0
  },

  // 重置路由
  resetRoute(): void {
    window.location.href = window.location.origin
  },

  // 清理对象
  cleanObject(object?: { [key: string]: unknown }) {
    if (!object) {
      return {}
    }
    const result = { ...object } // 在一个函数里，改变传入的对象本身是不好的
    Object.keys(result).forEach(key => {
      const value = result[key]
      if (this.isVoid(value)) {
        delete result[key]
      }
    })
    return result
  },

  // 传入一个对象，和键集合，返回对应的对象中的键值对
  subset<O extends { [key in string]: unknown }, K extends keyof O>(obj: O, keys: K[]) {
    const filteredEntries = Object.entries(obj).filter(([key]) => keys.includes(key as K))
    return Object.fromEntries(filteredEntries) as Pick<O, K>
  },

  // 数组生成
  generateArray(len: number): null[] {
    return new Array(len).fill(null)
  },

  // 隐藏手机号
  formatPhone(phone: string): string {
    return phone?.length === 11 ? phone.replace(/(\d{3})\d*(\d{4})/g, "$1****$2") : ""
  },

  // 格式化金额
  formatMoney(fee: number, prefix = "", suffix = ""): string {
    return fee ? prefix + fee.toFixed(2) + suffix : "--"
  },

  // 随机字符串
  randomString(length = 8, incNumber = false): string {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    str += incNumber ? "0123456789" : ""
    let res = ""
    for (let i = length; i > 0; --i) {
      res += str[Math.floor(Math.random() * str.length)]
    }
    return res
  },

  // 首字母大写
  capitalizeInitials(str: string): string {
    return str.replace(/^\S/, s => s.toUpperCase())
  },

  // 路径名称
  pathName(path: string): string | undefined {
    const pathArr = path.split("/")
    let name = pathArr.pop()
    name = name || pathArr.pop()

    return name
  },

  // 获取文件名
  fileName(url: string): string {
    const filename = url.split("/").pop()
    if (!filename) return ""

    return filename.substring(0, filename.lastIndexOf(".")) // "." 最后出现的位置
  },
}
