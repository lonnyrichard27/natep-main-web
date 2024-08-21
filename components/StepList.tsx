import { ReactNode } from 'react';

interface Step {
  title: string;
  subtitle: string;
  icon: ReactNode;
  completed?: ReactNode;
  isCompleted: boolean;
  otherIcon?: ReactNode;
}

const StepList = ({
  icon,
  title,
  subtitle,
  completed,
  isCompleted,
  otherIcon,
}: Step) => {
  return (
    <div className="p-4">
      <div className={`flex items-center gap-4`}>
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full bg-green-800`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg text-[#344054] font-medium">{title}</h3>
          <p className="text-sm text-[#667085] font-light">{subtitle}</p>
        </div>
        {isCompleted ? completed : otherIcon}
      </div>
    </div>
  );
};

export default StepList;
