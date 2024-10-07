export const dropdownIcon = (img: any) => {
  if (img == 1) {
    return (
      <svg
        width='25'
        height='18'
        viewBox='0 0 25 18'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M20.1999 5.99159L12.8004 11.4726L5.40096 5.99159C5.26876 5.89346 5.09129 5.83853 4.90648 5.83853C4.72168 5.83853 4.5442 5.89346 4.412 5.99159C4.34799 6.03925 4.29713 6.09613 4.26241 6.15891C4.2277 6.2217 4.20981 6.28911 4.20981 6.35721C4.20981 6.42531 4.2277 6.49273 4.26241 6.55551C4.29713 6.61829 4.34799 6.67518 4.412 6.72284L12.2837 12.5548C12.422 12.6572 12.6074 12.7145 12.8004 12.7145C12.9935 12.7145 13.1789 12.6572 13.3171 12.5548L21.1889 6.72396C21.2533 6.67627 21.3046 6.61924 21.3396 6.55625C21.3746 6.49326 21.3926 6.42558 21.3926 6.35721C21.3926 6.28884 21.3746 6.22116 21.3396 6.15817C21.3046 6.09518 21.2533 6.03816 21.1889 5.99046C21.0567 5.89234 20.8792 5.8374 20.6944 5.8374C20.5096 5.8374 20.3321 5.89234 20.1999 5.99046V5.99159Z'
          fill='#002366'
        />
      </svg>
    );
  }

  if (img == 2) {
    return (
      <svg
        width='12'
        height='8'
        viewBox='0 0 12 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0.101076 0.657184L4.75769 5.88725C4.89154 6.03758 5.10856 6.03758 5.24241 5.88725L9.8989 0.657184C10.1148 0.414655 9.96197 0 9.65651 0H0.343444C0.0380781 0 -0.114844 0.414671 0.101076 0.657184Z'
          fill='#CB6015'
        />
      </svg>
    );
  }

  if (img == 3) {
    return (
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3 7H21'
          stroke='#CB6015'
          stroke-width='1.5'
          stroke-linecap='round'
        />
        <path
          d='M6 12H18'
          stroke='#CB6015'
          stroke-width='1.5'
          stroke-linecap='round'
        />
        <path
          d='M10 17H14'
          stroke='#CB6015'
          stroke-width='1.5'
          stroke-linecap='round'
        />
      </svg>
    );
  }
};