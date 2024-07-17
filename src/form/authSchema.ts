import { z } from "zod"

export const authSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    // type is one of the following ["login", "register"] if type is register name is required
    type: z.enum(["login", "register"]).optional(),
    name: z.string().optional(),
  })
  .refine((data) => data.type !== "register" || !!data.name, {
    message: "Name is required",
    path: ["name"],
  })

export type AuthSchema = z.infer<typeof authSchema>
