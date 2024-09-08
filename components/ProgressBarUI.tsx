import { usePathname } from 'next/navigation';
import React from 'react';

const ProgressbarUi = () => {
  const steps = [
    {
      label: 'Verify NIN',
      route: '/dashboard/new-application/verify-nin',
    },
    {
      label: 'Biometrics',
      route: '/dashboard/new-application/verify-biometrics',
    },
    {
      label: 'Passport',
      route: '/dashboard/new-application/passport',
    },
    {
      label: 'Photograph',
      route: '/dashboard/new-application/photograph',
    },
    {
      label: 'Address',
      route: '/dashboard/new-application/address',
    },
    {
      label: 'Education',
      route: '/dashboard/new-application/education',
    },
    {
      label: 'Employment',
      route: '/dashboard/new-application/employment',
    },
    {
      label: 'Police Report',
      route: '/dashboard/new-application/police-report',
    },
    {
      label: 'Medical Report',
      route: '/dashboard/new-application/medical_report',
    }
  ];
  const pathname = usePathname();

  const theIndex = () => {
    const currentIndex = steps.findIndex((step) => step.route === pathname);
    return currentIndex;
  };

  return (
    <ul className="relative flex flex-col md:flex-row my-5 md:gap-x-2">
      {steps.map((step, index) => (
        <li key={index} className="shrink md:basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
            <span
              className={`size-4 flex justify-center items-center shrink-0 font-medium rounded-full ${
                index <= theIndex()
                  ? 'bg-[#248048] text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            ></span>
            <div
              className={`hidden md:block ms-2 w-full h-px flex-1 ${
                index < theIndex() ? 'bg-[#A3E2BC]' : 'bg-gray-200'
              } group-last:hidden`}
            ></div>
          </div>
          <div className="mt-3 text-center md:text-left">
            <span className="block text-sm font-medium text-gray-800">
              {step.label}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProgressbarUi;
