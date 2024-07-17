import {
  useQuery as useQueryCore,
  QueryKey,
  UseQueryOptions,
} from "@tanstack/react-query"
import { useEffect } from "react"
import { ONE_DAY } from "src/constants"
import { loadLocalStorageData } from "src/libs/react-query"

type UseQueryExtras = {
  storage?: boolean
}

export const useQuery = <
  TQueryFnData = unknown,
  TError = any,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> &
    UseQueryExtras
) => {
  const { refetch, ...queryRes } = useQueryCore<TData, TError, TQueryFnData>({
    ...options,
    enabled: false,
    retry: false,
    cacheTime: ONE_DAY,
    staleTime: ONE_DAY,
  } as any)

  useEffect(() => {
    loadLocalStorageData(options.queryKey as any)
  }, [options.queryKey])

  return { refetch, ...queryRes } as const
}
