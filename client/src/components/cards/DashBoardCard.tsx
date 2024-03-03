import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: number;
  children: ReactNode;
}
const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className="rounded-lg border flex justify-center items-center gap-10 p-10 border-gray-30 shadow-default dark:border-dark dark:bg-gray-700">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-white">
            {`${total}`}
          </h4>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
