import * as React from "react"

function BackSvg(props:any) {
  return (
    <svg
      width={13}
      height={13}
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 5h10M4.978 8.978L1 5l3.978-3.977"
        stroke="#667085"
        strokeWidth={0.96}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default BackSvg
