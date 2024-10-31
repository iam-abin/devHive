import React from "react";

const PaymentPlanCard: React.FC<{
    makePayment: any;
    candidateProfileData: any;
    planData: any;
}> = ({ makePayment, candidateProfileData, planData }) => {
    return (
        <div className="flex flex-col w-4/12 p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white shadow-2xl shadow-indigo-500/30">
            <h3 className="mb-4 text-2xl font-semibold">
                {planData?.name}
                {/* Life long */}
            </h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                {planData?.description}
                {/* Best option for candidate who are looking for a job and to know more about recruiter. */}
            </p>
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">
                    ₹{planData?.price}
                    {/* ₹299 */}
                </span>{" "}
                {/* Rupee symbol */}
            </div>
            {/* List */}
            <ul
                role="list"
                className="mb-8 space-y-4 text-left flex flex-col flex-grow"
            >
                {planData?.features.length > 0
                    ? planData.features.map((item: string, index: number) => (
                          <li
                              key={index}
                              className="flex items-center space-x-3"
                          >
                              {/* Icon */}
                              <svg
                                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                              >
                                  <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                  ></path>
                              </svg>
                              <span>
                                  {/* Unlock View recruiter profile option */}
                                  {item}
                              </span>
                          </li>
                      ))
                    : "no features are listed yet"}
            </ul>

            <button
                onClick={() => makePayment(planData?.id, planData?.price)}
                className="text-white hover:bg-yellow-900 shadow-2xl shadow-cyan-500/50 bg-purple-900 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
                disabled={candidateProfileData?.isPremiumUser}
            >
                {candidateProfileData?.isPremiumUser
                    ? "You already purchased"
                    : "Get started"}
            </button>
        </div>
    );
};

export default PaymentPlanCard;
