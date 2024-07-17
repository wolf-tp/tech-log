import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCookie, setCookie } from "cookies-next"
import { useEffect } from "react"
import { queryKey } from "src/constants/queryKey"

type Scheme = "light" | "dark"
type SetScheme = (scheme: Scheme) => void

const useScheme = (): [Scheme, SetScheme] => {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: queryKey.scheme(),
    enabled: false,
    initialData: "light",
  })

  const scheme = data === "light" ? "light" : "dark"

  const setScheme = (scheme: "light" | "dark") => {
    setCookie("scheme", scheme)

    queryClient.setQueryData(queryKey.scheme(), scheme)

    // Tailwind scheme
    const classList = document.documentElement.classList
    const isDarkMode = scheme === "dark"
    isDarkMode ? classList.add("dark") : classList.remove("dark")
  }

  useEffect(() => {
    if (!window) return

    const scheme = getCookie("scheme")
    setScheme(scheme === "dark" ? "dark" : "light")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [scheme, setScheme]
}

export default useScheme
