import { useEffect, useLayoutEffect } from "react"

// ----------------------------------------------------------------------

/**
 * 浏览器把内容渲染到界面之前（异步）
 */
export const useDidMount = (func: () => void) => {
  useEffect(func, [func])
}

/**
 * 浏览器把内容渲染到界面之前（同步）
 * 相当于：componentDidMount
 */
export const useDidMountSync = (func: () => void) => {
  useLayoutEffect(func, [func]) // useLayoutEffect 先于 useEffect 执行，并且子组件优先执行
}

export default useDidMount
