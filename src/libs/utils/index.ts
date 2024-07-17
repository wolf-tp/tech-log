export function formatDate(date: any, local: any) {
  const d = new Date(date)
  const options: any = { year: "numeric", month: "short", day: "numeric" }
  const res = d.toLocaleDateString(local, options)
  return res
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  ...keys: K[]
) => {
  const result = {} as Pick<T, keyof T>
  keys.forEach((key) => obj[key] !== undefined && (result[key] = obj[key]))
  return result as Pick<T, K>
}
