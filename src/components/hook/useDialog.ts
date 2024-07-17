import { Ref, useCallback, useImperativeHandle, useState } from "react"

export const useDialog = (ref: Ref<DialogRef>, params?: any) => {
  const [open, setOpen] = useState(false)
  const [paramsValue, setParamsValue] = useState(params)

  const onClose = useCallback(() => {
    setOpen(false)
  }, [])

  const onOpen = useCallback((params?: any) => {
    setOpen(true)
    setParamsValue(params)
  }, [])

  useImperativeHandle(
    ref,
    () => ({
      open: onOpen,
      close: onClose,
    }),
    [onClose, onOpen]
  )

  return { open, setOpen, paramsValue, onClose, onOpen }
}
