import { appWriteAccount } from "../config/appwrite"
import { setQueriesData } from "../react-query"
import { ID, Models } from "appwrite"
import { pick } from "../utils"
import { useQuery } from "src/hooks/useQuery"

export type UserType = Models.User<any> &
  Pick<
    Models.Session,
    "expire" | "providerAccessToken" | "providerAccessTokenExpiry" | "secret"
  >

export const useAuth = () => {
  const { data, isLoading } = useQuery<UserType>({
    queryKey: ["user"],
  })

  return { user: data, loading: isLoading }
}

export const useAuthHandler = () => {
  const { user, loading } = useAuth()

  const handleLogout = async () => {
    if (!user?.$id) return

    setQueriesData({
      key: "user",
      data: null,
      localStorage: true,
    })

    try {
      appWriteAccount.deleteSession("current")
    } catch (error) {}
  }

  const handleLogin = async (
    params: Required<Pick<Models.User<any>, "email" | "password">>
  ) => {
    const { email, password } = params
    try {
      const session = await appWriteAccount.createEmailPasswordSession(
        email,
        password
      )
      const user = await appWriteAccount.get()
      setQueriesData({
        key: "user",
        data: {
          ...user,
          ...pick(
            session,
            "expire",
            "providerAccessToken",
            "providerAccessTokenExpiry",
            "secret"
          ),
        },
        localStorage: true,
      })

      return session
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const handleSignup = async (
    params: Required<Pick<Models.User<any>, "email" | "password" | "name">>
  ) => {
    const { email, password = "", name } = params

    try {
      const session = await appWriteAccount.create(
        ID.unique(),
        email,
        password,
        name
      )
      handleLogin(params)

      return session
    } catch (error) {
      console.log(error)
      return null
    }
  }

  return {
    user,
    loading,
    handleLogout,
    handleLogin,
    handleSignup,
    isLoggedIn: !!user?.$id,
  }
}
