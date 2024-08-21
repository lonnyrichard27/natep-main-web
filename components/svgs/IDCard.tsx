import * as React from "react"

function IDCard(props:any) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M5.667 8a2.805 2.805 0 012.778 2.86v.473H2.889v-.472A2.805 2.805 0 015.667 8zm0-3.333a1.667 1.667 0 110 3.333 1.667 1.667 0 010-3.333zm-5 10h16.666V1.333H.667v13.334zm10-8.334h4.166-4.166zm1.666 3.334h2.5-2.5z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IDCard
