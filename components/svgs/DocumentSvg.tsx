import * as React from "react"

function DocumentSvg(props:any) {
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
        d="M13.333 11.667H6.667M13.333 15H6.667m1.666-6.667H6.667m-3.334 10V1.667h8.334l5 5v11.666H3.333z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default DocumentSvg
