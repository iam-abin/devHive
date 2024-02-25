import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import TopNavBarCandidate from "../../components/navBar/TopNavBarCandidate";
import Footer from "../../components/footer/Footer";

const PaymentPlans = () => {
  return (
    <>
    
    <TopNavBarCandidate />
    
    <section className="bg-white dark:bg-gray-900 h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Premium
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Unlock premium access to view recruiter profiles by choosing our affordable payment plan and elevate your job search experience.
          </p>
        </div>
        <div className="flex justify-center">
          {/* Pricing Card */}
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white shadow-2xl shadow-indigo-500/30">
            <h3 className="mb-4 text-2xl font-semibold">Life long</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            Best option for candidate who are looking for a job and to know more about recruiter.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">₹299</span> {/* Rupee symbol */}
            </div>
            {/* List */}
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
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
                <span>Unlock View recruiter profile option</span>
              </li>
              {/* ... (other list items) ... */}
            </ul>
            {/* ... (remaining content) ... */}
            <Link
              to="#"
              className="text-white  hover:bg-yellow-900 shadow-2xl shadow-cyan-500/50 bg-purple-900 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    
    
    </>
  );
};

export default PaymentPlans;
