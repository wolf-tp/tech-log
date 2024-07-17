export const queryKey = {
  scheme: () => ["scheme"],
  posts: () => ["posts"],
  tags: () => ["tags"],
  categories: () => ["categories"],
  post: (slug: string) => ["post", slug],
  user: () => ["user"],
}

export type QueryKeyMap = typeof queryKey

export type QueryKey = keyof QueryKeyMap
