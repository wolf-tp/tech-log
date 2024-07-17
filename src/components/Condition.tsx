import React, { ReactElement, ReactNode } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

export type ConditionProps = {
  condition?: boolean
  children?: ReactElement
}

export const Condition = ({ condition, children }: ConditionProps) => {
  return condition ? children : null
}

export type ConditionControllerProps<
  T extends FieldValues,
  K extends Path<T>
> = {
  name: K
  control: Control<T, any>
  conditionFn?: (value: T[K]) => boolean
  unMatchComponent?: ReactNode
  children?: ReactNode[] | ReactNode
}

export const ConditionController = <T extends FieldValues, K extends Path<T>>({
  name,
  control,
  ...props
}: ConditionControllerProps<T, K>) => {
  return (
    <Controller
      name={name}
      control={control}
      // @ts-ignore
      render={({ field: { value } }) => {
        const isTrue = props.conditionFn?.(value)

        if (!isTrue) {
          return props.unMatchComponent ?? null
        }

        return props.children
      }}
    />
  )
}
