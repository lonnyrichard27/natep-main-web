import * as React from "react"

function LocationSvg(props:any) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_384_1036)">
        <path
          clipRule="evenodd"
          d="M10 1.667a5.985 5.985 0 00-5.986 5.985c0 5.39 5.985 10.681 5.985 10.681s5.986-5.29 5.986-10.68a5.985 5.985 0 00-5.986-5.986zm0 7.92a2.083 2.083 0 100-4.166 2.083 2.083 0 000 4.167z"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_384_1036">
          <path fill="#fff" d="M0 0H20V20H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default LocationSvg
