import * as React from "react"

function PhoneSvg(props:any) {
  return (
    <svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M19.5 4v16a2 2 0 01-2 2h-10a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2zm-10 15h6-6z"
        stroke="#2B9957"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PhoneSvg
