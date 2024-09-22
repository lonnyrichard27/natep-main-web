import * as React from "react"

function Biometric(props:any) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_384_926)">
        <path
          d="M18.333 13.333v5h-5m-6.666 0h-5v-5M13.333 1.666h5v5M1.667 6.666v-5h5m7.5 4.167v8.334H5.833V5.833h8.334z"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_384_926">
          <path fill="#fff" d="M0 0H20V20H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Biometric
