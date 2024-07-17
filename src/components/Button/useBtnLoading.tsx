import React, { ForwardedRef, useImperativeHandle, useState } from "react"

export type IButtonRef = {
  withLoader: <T>(
    fn: (() => Promise<T>) | Promise<T> | Promise<T>[],
    onError?: (err: any) => void
  ) => Promise<T>
}

export const useBtnLoading = (ref: ForwardedRef<IButtonRef>) => {
  const [loading, setLoading] = useState<boolean>()

  useImperativeHandle(
    ref,
    () => ({
      // @ts-ignore
      withLoader: async (fn, onErr) => {
        setLoading(true)
        let result = null

        try {
          result = await (typeof fn === "function" ? fn() : fn)
        } catch (e) {
          console.warn(e)
          onErr?.(e)
        } finally {
          setLoading(false)
        }

        return result
      },
    }),
    []
  )
  return { loading }
}

export const useBtnLoadingExecute = () => {
  const btnRef = React.useRef<IButtonRef>(null)

  const withLoader = React.useCallback<IButtonRef["withLoader"]>(
    async (fn, onErr) => {
      if (!btnRef.current) return null as any
      return await btnRef.current.withLoader(fn, onErr)
    },
    [btnRef]
  )

  return [btnRef, withLoader] as const
}
