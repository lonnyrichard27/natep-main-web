import * as React from "react"

function CameraFocus(props:any) {
  return (
    <svg
      width={30}
      height={31}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.333 10.5C13.733 10.5 10 6.77 10 2.167A8.333 8.333 0 011.667 10.5 8.333 8.333 0 0110 18.833a8.334 8.334 0 018.333-8.333z"
        fill="#2B9957"
      />
    </svg>
  )
}

export default CameraFocus
