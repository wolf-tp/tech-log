import {
  Button as ButtonComponent,
  ButtonProps as ButtonComponentProps,
} from "@headlessui/react"
import clsx from "clsx"
import React, { Ref, forwardRef } from "react"
import { SyncLoader } from "react-spinners"
import { IButtonRef, useBtnLoading } from "./useBtnLoading"
export { useBtnLoadingExecute } from "./useBtnLoading"

export type ButtonProps = ButtonComponentProps & {
  children: React.ReactNode
}

const Button = forwardRef(function Button(
  { children, ...props }: ButtonProps,
  ref: Ref<IButtonRef>
) {
  const { loading } = useBtnLoading(ref)
  return (
    <ButtonComponent
      {...props}
      className={clsx(
        "shadow-lg flex items-center justify-center rounded-full border border-transparent p-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-[#505BD2] to-[#07C9DC] transition-transform enabled:hover:scale-110 disabled:cursor-wait",
        props.className
      )}
      disabled={loading}
    >
      {children}
      {loading && (
        <SyncLoader loading size={5} color="#fff" speedMultiplier={0.5} />
      )}
    </ButtonComponent>
  )
})

export default Button
