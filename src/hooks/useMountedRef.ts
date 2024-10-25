import { useEffect, useRef } from "react"

// ----------------------------------------------------------------------

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回 false，反之返回 true
 * 作用：阻止在已卸载组件上赋值
 */
export default function useMountedRef() {
  const mountedRef = useRef(false) // 组件没有挂载时返回 false

  useEffect(() => {
    mountedRef.current = true // 组件加载后返回 true
    return () => {
      mountedRef.current = false // 组件卸载时候返回 false
    }
  })

  return mountedRef
}
