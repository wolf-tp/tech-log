/* eslint-disable react/display-name */
import Image from "next/image"
import { Ref, forwardRef } from "react"
import { CONFIG } from "site.config"
import Button, { useBtnLoadingExecute } from "src/components/Button"
import { TextFieldController } from "src/components/Input"
import { resolver, useForm } from "src/form"
import { AuthSchema, authSchema } from "src/form/authSchema"
import { useDialog } from "../hook/useDialog"
import { CloseIcon } from "../svg-icons/close"
import { Controller } from "react-hook-form"
import { ConditionController } from "../Condition"
import { DIALOG_STYLES } from "src/constants"
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import { useAuthHandler } from "src/libs/auth"

const ReactModal = dynamic(() => import("react-modal"), { ssr: false })

const HEIGHT_RATIO = 1
const IMG_WIDTH = 300

const LoginDialog = forwardRef((_, ref: Ref<DialogRef>) => {
  const { open, onClose } = useDialog(ref)
  const [btnSubmitRef, exec] = useBtnLoadingExecute()
  const { handleLogin, handleSignup } = useAuthHandler()

  const { handleSubmit, control, clearErrors, setError } = useForm<AuthSchema>({
    resolver: resolver(authSchema),
    defaultValues: {
      type: "login",
    },
  })

  const showIncorrectEmailOrPasswordError = () => {
    setError("email", {
      type: "onChange",
      message: "Email or password is incorrect",
    })
  }

  const onSubmit = async (data: AuthSchema) => {
    const { email, password, name = "" } = data
    const isLogin = data.type === "login"

    try {
      if (!isLogin) {
        const session = await exec(handleSignup({ email, password, name }))
        return session
      }

      const session = await exec(handleLogin({ email, password }))

      if (session?.$id) onClose()
      else showIncorrectEmailOrPasswordError()
      return session
    } catch (error) {
      showIncorrectEmailOrPasswordError()
    }
  }

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onClose}
      style={DIALOG_STYLES}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc
    >
      <div className="flex shadow-md bg-gradient-to-br from-[#F3CDFF] to-[#C4EBFE] rounded-2xl mt-4 font-mono w-fit self-center p-6 px-4 md:px-10 transition-all">
        <div className="flex-col hidden md:flex flex-grow-0 flex-shrink-0">
          <h1 className="text-3xl font-bold absolute ml-4">
            Tech
            <br />
            Log
          </h1>
          <Image
            className="flex flex-1 -rotate-12 aspect-square hover:scale-110 transition-all"
            src={"/login-rocket.png"}
            alt="login"
            width={IMG_WIDTH}
            height={IMG_WIDTH * HEIGHT_RATIO}
          />
        </div>

        <div>
          <div className="self-center flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-center md:hidden">
              {CONFIG.blog.title}
            </h1>

            <ConditionController
              control={control}
              name="type"
              conditionFn={(value) => value === "register"}
            >
              <TextFieldController
                control={control}
                label="Name"
                placeholder="Enter your name"
                name="name"
                required
              />
            </ConditionController>

            <TextFieldController
              control={control}
              label="Email"
              placeholder="Enter your email"
              name="email"
              type="email"
            />

            <TextFieldController
              control={control}
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
            />

            <Controller
              control={control}
              name="type"
              render={({ field: { value, onChange } }) => {
                const isLogin = value === "login"
                return (
                  <>
                    <Button
                      ref={btnSubmitRef}
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className={"mx-10 mt-4"}
                    >
                      {isLogin ? "Login" : "Register"}
                    </Button>

                    <div className="flex self-center">
                      <h1 className="text-center inline-flex">
                        {isLogin ? "Not a member?" : "Already a member?"}
                        <button
                          className="underline flex text-blue-700 px-2"
                          onClick={() => {
                            onChange(isLogin ? "register" : "login")
                            clearErrors()
                          }}
                        >
                          {isLogin ? "Register" : "Login"}
                        </button>
                      </h1>
                    </div>
                  </>
                )
              }}
            />
            {/* <Button type="button" className={"mx-10"}>
          Register
        </Button> */}
          </div>
        </div>
        <CloseIcon
          className="absolute top-9 right-6 cursor-pointer w-6 h-6 transition-transform hover:scale-110"
          onClick={onClose}
        />
      </div>
    </ReactModal>
  )
})

export default LoginDialog
