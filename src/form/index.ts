"use client"

import { useForm as useFormHook } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const useForm = useFormHook
export const resolver = zodResolver
