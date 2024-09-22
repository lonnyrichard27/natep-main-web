import Link from 'next/link';
import { ReactNode } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';

interface Step {
  title: string;
  subtitle: string;
  icon: ReactNode;
  isCompleted: boolean;
  isQueried: boolean;
  link?: string;
}

const StepList = ({
  icon,
  title,
  subtitle,
  isCompleted,
  isQueried,
  link
}: Step) => {
  return (
    <Link href={link ?? ''} className="p-4">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full bg-green-800`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg text-[#344054] font-medium">{title}</h3>
          <p className="text-sm text-[#667085] font-light">{subtitle}</p>
        </div>
        {/* Display the completed icon only if it's not queried */}
        {!isQueried && isCompleted ? (
          <IoCheckmarkCircle className="text-[#2B9957] text-2xl" />
        ) : isQueried && isCompleted ? (
          <MdCancel className="text-red-500 text-2xl" />
        ) : (
          <IoCheckmarkCircle className="text-gray-300 text-2xl" />
        )}
      </div>
    </Link>
  );
};

export default StepList;
