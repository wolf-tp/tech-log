/* eslint-disable react/display-name */
import React, { memo } from "react"
import { Field, Input, InputProps, Label } from "@headlessui/react"
import clsx from "clsx"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

export type InputComponentProps = {
  label: string
  placeholder: string
  errorMessage?: string
} & InputProps

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  errorMessage,
  ...props
}) => {
  return (
    <Field>
      <Label className="text-sm/6 font-medium text-slate-500">{label}</Label>
      <Input
        {...props}
        className={clsx(
          "shadow-lg mt-3 block w-full rounded-full border-none bg-white/80 py-1.5 px-3 text-sm/6 text-gray-700 hover:bg-white/90 font-mono min-w-[20rem]",
          props.className
        )}
      />
      {errorMessage && (
        <p className="ml-4 text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </Field>
  )
}

export type TextFieldControllerProps<
  T extends FieldValues,
  K extends Path<T>
> = {
  name: K
  control: Control<T, any>
}

export const TextFieldComponentController = <
  T extends FieldValues,
  K extends Path<T>
>({
  name,
  control,
  onChange: _onChange,
  ...props
}: TextFieldControllerProps<T, K> & InputComponentProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <InputComponent
            errorMessage={error?.message}
            onChange={(event) => {
              onChange?.(event)
              _onChange?.(event)
            }}
            value={value}
            {...props}
          />
        )
      }}
    />
  )
}

export const TextFieldController = memo(
  TextFieldComponentController
) as typeof TextFieldComponentController

export default InputComponent
