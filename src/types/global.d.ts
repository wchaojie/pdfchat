type StrNum = number | string

interface Dict<T> {
  [key: string]: T
}

interface IPagingReq {
  page?: number
  size?: number
}

interface IPagingRes<T> {
  items: T[]
  total: number
  curPage: number
  pageSize: number
}

// 类型工具，字段部分可选
type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
