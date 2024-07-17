import { useEffect, useRef } from "react"

export const usePopoverHover = () => {
  const popoverRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const popover = popoverRef.current
    const button = buttonRef.current

    if (!popover || !button) {
      console.warn(
        "usePopoverHover: Please assign popoverRef and buttonRef for this to function correctly."
      )
      return () => {}
    }

    const clickButton = () => {
      button.click()
    }

    popover.addEventListener("mouseenter", clickButton)
    popover.addEventListener("mouseleave", clickButton)

    return () => {
      popover.removeEventListener("mouseenter", clickButton)
      popover.removeEventListener("mouseleave", clickButton)
    }
  }, [])

  return { popoverRef, buttonRef }
}
