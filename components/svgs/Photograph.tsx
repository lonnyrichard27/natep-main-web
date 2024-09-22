import * as React from "react"

function Photograph(props:any) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 16.667a5 5 0 00-10 0m5-15a8.334 8.334 0 015.163 14.875l-.163.125a8.333 8.333 0 11-5-15zm0 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Photograph;
