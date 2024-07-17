"use client"

import { compress, decompress } from "lz-string"
import { LDB_KEYS } from "./constants"
import { QueryKey } from "src/constants/queryKey"

type LDBKeysType = keyof typeof LDB_KEYS | QueryKey | string

const setItem = (key: LDBKeysType, value: any) => {
  value = typeof value === "string" ? value : JSON.stringify(value)
  value = compress(value)

  window.localStorage.setItem(key, value)
}

const getItem = (key: LDBKeysType) => {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(decompress(value)) : value
  } catch (error) {
    return null
  }
}

const removeItem = (key: LDBKeysType) => {
  window.localStorage.removeItem(key)
}

const clear = () => {
  window.localStorage.clear()
}

export const localStorageService = {
  setItem,
  getItem,
  removeItem,
  clear,
}
