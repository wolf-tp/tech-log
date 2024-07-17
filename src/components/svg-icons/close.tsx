import * as React from "react"

export const CloseIcon = ({
  fill,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="4.5 4.5 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z"
      // red-500
      fill={fill || "#E60000"}
    />
  </svg>
)
