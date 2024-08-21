import * as React from "react"

function EmploymentSvg(props:any) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_384_1924)">
        <path
          clipRule="evenodd"
          d="M5.07 5h13.263v13.32l-16.666.013V5h3.402zm8.263 0V1.667H6.667V5h6.666z"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_384_1924">
          <path fill="#fff" d="M0 0H20V20H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default EmploymentSvg
