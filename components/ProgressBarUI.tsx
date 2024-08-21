import React from 'react';

interface StepperProps {
  step: number;
  totalSteps: number;
  labels: string[];
}

const ProgressBarUI: React.FC<StepperProps> = ({ step, totalSteps, labels }) => {
  return (
    <ul className="relative flex flex-col md:flex-row my-5 md:gap-x-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <li key={index} className="shrink md:basis-0 flex-1 group">
          <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
            <span
              className={`size-4 flex justify-center items-center shrink-0 font-medium rounded-full ${
                index <= step ? 'bg-[#248048] text-white' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {/* {index + 1} */}
            </span>
            <div
              className={`hidden md:block ms-2 w-full h-px flex-1 ${
                index < step ? 'bg-[#A3E2BC]' : 'bg-gray-200'
              } group-last:hidden`}
            ></div>
          </div>
          <div className="mt-3 text-center md:text-left">
            <span className="block text-sm md:text-lg font-medium text-gray-800">
              {labels[index]}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProgressBarUI;
