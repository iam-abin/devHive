
function JobCardShimmerLandingPage() {
  return (
    <div className="mx-40 pb-4" key="shimmer">
      <div className="flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg animate-pulse hover:border-blue-500 hover:translate-y-1 hover:scale-103">
        <div className="flex flex-col items-start gap-3">
          <div className="h-6 w-48 bg-gray-200 rounded-md dark:bg-gray-500 animate-pulse mb-2.5"></div>
          <div className="h-4 w-72 bg-gray-200 rounded-md dark:bg-gray-500 animate-pulse mb-2.5"></div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-40 bg-gray-200 rounded-md dark:bg-gray-500 animate-pulse mb-2.5"></div>
            <div className="h-6 w-40 bg-gray-200 rounded-md dark:bg-gray-500 animate-pulse mb-2.5"></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-4 w-48 bg-gray-200 rounded-md dark:bg-gray-500 animate-pulse mb-2.5"></div>
          <div className="h-10 w-32 bg-gray-200 rounded-md dark:bg-gray-500 animate-pulse mb-2.5"></div>
        </div>
      </div>
    </div>
  );
}

export default JobCardShimmerLandingPage
