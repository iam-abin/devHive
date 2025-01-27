const PaymentPlanCardShimmer = () => {
    return (
        <div className="animate-pulse flex flex-col w-4/12 p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white shadow-2xl shadow-indigo-500/30">
            <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-12 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-4 w-full">
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded mt-8"></div>
        </div>
    );
};

export default PaymentPlanCardShimmer;
