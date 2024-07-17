"use client"
import { QueryClient } from "@tanstack/react-query"
import { queryKey, QueryKey, QueryKeyMap } from "src/constants/queryKey"
import { ONE_DAY, ONE_MINUTE } from "src/constants"
import { localStorageService } from "../ldb/localStorage"
import { appWriteAccount } from "../config/appwrite"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: ONE_MINUTE * 10,
      staleTime: ONE_MINUTE * 10,
    },
  },
})

export type QueryKeyWithParams<T extends QueryKey> = {
  key: T
  params?: Parameters<QueryKeyMap[T]>[0]
}

export type InvalidItemQuery = QueryKey | QueryKeyWithParams<QueryKey>

export const invalidateQueries = (...args: InvalidItemQuery[]) => {
  args.forEach((arg) => {
    const isString = typeof arg === "string"
    const getKeyFn = queryKey[isString ? arg : arg.key]

    // @ts-ignore
    const key = isString ? getKeyFn() : getKeyFn(arg.params)

    queryClient.invalidateQueries({
      queryKey: key,
    })
  })
}

export const setQueriesData = (options: {
  key: QueryKey | any[]
  data: unknown
  updatedAt?: number
  params?: Parameters<QueryKeyMap[QueryKey]>[0]
  localStorage?: boolean
}) => {
  const { data, key, updatedAt, params, localStorage } = options || {}

  // @ts-ignore
  const queryKeyExec = Array.isArray(key) ? key : queryKey[key](params)

  queryClient.setQueryData(queryKeyExec, data, {
    updatedAt,
  })

  if (localStorage) {
    if (!data) {
      localStorageService.removeItem(JSON.stringify(queryKeyExec))
      return
    }

    localStorageService.setItem(JSON.stringify(queryKeyExec), data)
  }
}

export const getLocalStorageData = (
  key: QueryKey | any[],
  params?: Parameters<QueryKeyMap[QueryKey]>[0]
) => {
  if (Array.isArray(key)) {
    localStorageService.getItem(JSON.stringify(key))
  }
  // @ts-ignore
  const queryKeyExec = queryKey[key](params)
  return localStorageService.getItem(JSON.stringify(queryKeyExec))
}

export const loadLocalStorageData = (
  key: QueryKey | any[],
  params?: Parameters<QueryKeyMap[QueryKey]>[0]
) => {
  const data = getLocalStorageData(key, params)

  if (!data) return null

  setQueriesData({
    key,
    data,
  })

  return data
}
