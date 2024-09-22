import * as React from "react"

function CrossSvg(props:any) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_384_2012)">
        <path
          clipRule="evenodd"
          d="M7.5 1.667h5.036L12.5 7.5h5.833v5.036L12.5 12.5v5.833h-5v-5.797H1.667V7.5H7.5V1.667z"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_384_2012">
          <path fill="#fff" d="M0 0H20V20H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default CrossSvg
