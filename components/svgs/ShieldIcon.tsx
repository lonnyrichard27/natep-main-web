import * as React from "react"

function ShieldIcon(props:any) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_384_1967)">
        <path
          clipRule="evenodd"
          d="M2.5 1.667h15v6.129c-.102 4.636-3.047 8.774-7.502 10.537C5.545 16.57 2.601 12.432 2.5 7.796v-6.13z"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_384_1967">
          <path fill="#fff" d="M0 0H20V20H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ShieldIcon
