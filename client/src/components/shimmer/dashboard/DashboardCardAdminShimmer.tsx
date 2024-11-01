import React from 'react';

const DashboardCardAdminShimmer: React.FC = () => {
  return (
    <div className="rounded-lg border flex justify-center items-center gap-10 p-10 border-gray-30 shadow-default dark:border-dark dark:bg-gray-700 animate-pulse">
      <div className="flex h-16 w-12 items-center justify-center rounded-full bg-gray-400">
        {/* Placeholder for icon or children */}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="h-6 w-24 bg-gray-300 rounded animate-pulse" />
          <span className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCardAdminShimmer;
