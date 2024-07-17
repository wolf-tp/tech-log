import { Client, Account } from "appwrite"

export const appWriteClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "")

export const appWriteAccount = new Account(appWriteClient)
