declare type DialogRef<T = any> = {
  close: () => void
  open: (params?: T) => void
}
