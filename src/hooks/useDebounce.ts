import { useEffect, useState } from "react"

// ----------------------------------------------------------------------

/**
 * @description 去除抖动
 * @param value 值
 * @param delay 延迟时间
 */
export default function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value) // 初始化值

  useEffect(() => {
    // 每次 value 变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 为防止内存泄漏，清除函数会在组件卸载前执行
    // 如果组件多次渲染，则在执行下一个 effect 之前，上一个 effect 就已被清除
    // 每次在上一次 useEffect 处理完以后再运行清理操作
    return () => clearTimeout(timeout)
  }, [value, delay]) // 注意：value 对象必须为 useState() 返回的状态值，不然会无限循环

  return debouncedValue
}
