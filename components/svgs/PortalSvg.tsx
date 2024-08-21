import * as React from "react"

function PortalSvg(props:any) {
  return (
    <svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_8609_23021)">
        <path
          clipRule="evenodd"
          d="M4.5 3h16c1.104 0 2 .96 2 2.143v10.714c0 1.184-.896 2.143-2 2.143h-16c-1.104 0-2-.959-2-2.143V5.143C2.5 3.96 3.396 3 4.5 3zm4 18.002h8-8z"
          stroke="#2B9957"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_8609_23021">
          <path fill="#fff" transform="translate(.5)" d="M0 0H24V24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default PortalSvg;
