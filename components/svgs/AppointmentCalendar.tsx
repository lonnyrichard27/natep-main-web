import * as React from "react"

function AppointmentCalendar(props:any) {
  return (
    <svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M16.5 2v3-3zm-8 0v3-3zm-2 2h12a3 3 0 013 3v12a3 3 0 01-3 3h-12a3 3 0 01-3-3V7a3 3 0 013-3zm15 5h-18 18z"
        stroke="#2B9957"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default AppointmentCalendar
