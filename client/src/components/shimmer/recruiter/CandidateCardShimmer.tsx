import React from "react";

const CandidateCardShimmer: React.FC = () => {
  return (
    <div className="md:mx-40 mb-4 px-2">
      <div className="flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg animate-pulse hover:border-blue-500 hover:translate-y-1 hover:scale-103">
        <div className="flex flex-col items-start gap-3">
          <div className="h-4 w-48 md:w-60 bg-gray-200 rounded-md dark:bg-gray-500 animate-pulse mb-1.5"></div>
          <div className="flex flex-col items-center gap-4">
            <div className="h-4 w-32 md:w-20 bg-gray-200 rounded-md dark:bg-gray-500 animate-pulse mb-1.5"></div>
            <div className="h-4 w-32 md:w-20 bg-gray-200 rounded-md dark:bg-gray-500 animate-pulse mb-1.5"></div>
            <div className="h-4 w-32 md:w-28 bg-gray-200 rounded-md dark:bg-gray-500 animate-pulse mb-1.5"></div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="h-10 w-24 md:w-32 bg-gray-200 rounded-md dark:bg-gray-500 animate-pulse mb-1.5"></div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCardShimmer;