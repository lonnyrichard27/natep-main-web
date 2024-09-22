import React, { Suspense } from 'react';

interface CardProps {
  mainText: string;
  subText: string;
}
const BasicDetailsCard = ({ mainText, subText }: CardProps) => {
  return (
    <Suspense>
      <article className="mt-6 rounded-lg bg-[#F9FAFB] w-full p-5">
        <p className="text-[#667085]">{mainText}</p>
        <p className="font-medium">{subText}</p>
      </article>
    </Suspense>
  );
};

export default BasicDetailsCard;
