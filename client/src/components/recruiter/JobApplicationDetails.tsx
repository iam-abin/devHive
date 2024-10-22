import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StatusChangeForm from "../dropDown/StatusChangeForm";
import { changeJobApplicationStatusApi } from "../../axios/apiMethods/jobs-service/jobs";
import { notify } from "../../utils/toastMessage";
import Swal from "sweetalert2";
import { formatDate } from "../../utils/date-functions";
import { formatCurrency } from "../../utils/currency-format";
import { FaFacebookMessenger, FaLock } from "react-icons/fa";
import { RootState } from "../../redux/reducer";
import { useSelector } from "react-redux";

const JobApplicationDetails: React.FC<{
    jobApplicationDetails: any;
    handleChangeApplicationStatus: any;
}> = ({ jobApplicationDetails }) => {
    const location = useLocation();
    console.log(jobApplicationDetails);

    const isRecruiterPage = location.pathname.includes("recruiter");
    const isCandidatePage = location.pathname.includes("candidate");

    const candidateProfileData: any = useSelector(
        (store: RootState) => store.userReducer.myProfile
    );

    if (isRecruiterPage) {
        // Do something specific for the "recruiter" page
    }
    const navigate = useNavigate();
    const handleViewRecruiter = () => {
        // let isPremiumUser = false;
        if (!candidateProfileData?.isPremiumUser) {
            notify("only premium users can view recruiter profile", "success");
            return;
        }

        navigate(
            `/candidate/recruiter-profile/${jobApplicationDetails?.recruiterId}`
        );
    };

    const handleViewCandidate = () => {
        navigate(
            `/recruiter/candidate-profile/${jobApplicationDetails?.candidateId}`
        );
    };

    const handleChangeStatus = async (applicationStatus: string) => {
        const status = {
            jobApplicationStatus: applicationStatus,
        };

        Swal.fire({
            title: `Do you want to change status to ${applicationStatus}?`,
            text: "Are you sure!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await changeJobApplicationStatusApi(
                    jobApplicationDetails?.id,
                    status
                );
                notify(response.message, "success");
            }
        });

        // setJobs(allJobs.data);
    };
    return (
        <div>
            <div>
                <div className="container mx-auto my-8 ">
                    <div className="max-w-2xl mx-3 md:mx-auto bg-white p-8 rounded-md shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold mb-4">
                                    {jobApplicationDetails
                                        ? jobApplicationDetails?.jobId?.title
                                        : "Loading..."}
                                </h1>
                                <p className="text-gray-600 mb-4">
                                    Company:{" "}
                                    {jobApplicationDetails
                                        ? jobApplicationDetails?.jobId
                                              ?.companyName
                                        : "Loading..."}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    Location:{" "}
                                    {jobApplicationDetails
                                        ? jobApplicationDetails?.jobId
                                              ?.companyLocation
                                        : "Loading..."}
                                </p>
                            </div>

                            <div className="mb-4">
                                Posted on :
                                <p>
                                    {jobApplicationDetails
                                        ? formatDate(
                                              jobApplicationDetails?.jobId
                                                  ?.createdAt
                                          )
                                        : "Loading..."}
                                </p>
                            </div>
                        </div>

                        {isRecruiterPage && (
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold mb-2">
                                    Candidate Details
                                </h2>
                                <p>
                                    {jobApplicationDetails
                                        ? jobApplicationDetails?.candidateId
                                              ?.name
                                        : "Loading..."}
                                    <br />
                                    {jobApplicationDetails
                                        ? jobApplicationDetails?.candidateId
                                              ?.email
                                        : "Loading..."}
                                    <br />
                                    <button
                                        className="btn bg-yellow-200"
                                        onClick={handleViewCandidate}
                                    >
                                        view Candidate
                                    </button>
                                </p>
                            </div>
                        )}

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">
                                Job Description
                            </h2>
                            <p>
                                {jobApplicationDetails
                                    ? jobApplicationDetails?.jobId
                                          ?.jobDescription
                                    : "Loading..."}
                            </p>
                        </div>
                        {jobApplicationDetails &&
                            jobApplicationDetails?.jobId
                                ?.experienceRequired && (
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Job Status
                                    </h2>
                                    <p
                                        className={`${
                                            jobApplicationDetails?.jobId
                                                ?.isActive
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {jobApplicationDetails?.jobId?.isActive
                                            ? "this job is open"
                                            : "No longer accepting applications"}
                                    </p>
                                </div>
                            )}
                        <div className="mb-4">
                            {jobApplicationDetails && (
                                <>
                                    <h2 className="text-xl font-semibold mb-2">
                                        Skills Required
                                    </h2>
                                    <ul className="list-disc pl-5">
                                        {jobApplicationDetails?.jobId
                                            ?.skills ? (
                                            jobApplicationDetails?.jobId?.skills.map(
                                                (
                                                    skill: string,
                                                    index: number
                                                ) => (
                                                    <li key={index}>{skill}</li>
                                                )
                                            )
                                        ) : (
                                            <li>Loading...</li>
                                        )}
                                    </ul>
                                </>
                            )}
                        </div>

                        {jobApplicationDetails &&
                            jobApplicationDetails?.jobId?.educationRequired && (
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Education Required
                                    </h2>
                                    <p>
                                        {
                                            jobApplicationDetails?.jobId
                                                ?.educationRequired
                                        }
                                    </p>
                                </div>
                            )}

                        {jobApplicationDetails &&
                            jobApplicationDetails?.recruiterId && (
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2">
                                        recruiter
                                    </h2>
                                    <p>
                                        {
                                            jobApplicationDetails?.recruiterId
                                                ?.name
                                        }
                                    </p>
                                    {isCandidatePage ? (
                                        <div className="flex gap-4 items-center">
                                            <button
                                                className="btn bg-yellow-200"
                                                onClick={handleViewRecruiter}
                                            >
                                                view recruiter
                                                {!candidateProfileData?.isPremiumUser && (
                                                    <FaLock />
                                                )}
                                            </button>

                                            <span className="text-3xl items-start   w-3/5">
                                                <FaFacebookMessenger
                                                    onClick={() =>
                                                        navigate(
                                                            `/candidate/chat/${jobApplicationDetails?.recruiterId}` // Add the path to your chat page
                                                        )
                                                    }
                                                    className=" cursor-pointer"
                                                />
                                            </span>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            )}

                        {jobApplicationDetails &&
                            jobApplicationDetails?.jobId
                                ?.experienceRequired && (
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Experience required
                                    </h2>
                                    <p>
                                        {
                                            jobApplicationDetails?.jobId
                                                ?.experienceRequired
                                        }
                                    </p>
                                </div>
                            )}

                        {jobApplicationDetails &&
                            jobApplicationDetails?.jobId?.deadline && (
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Deadline
                                    </h2>
                                    <p>
                                        {formatDate(
                                            jobApplicationDetails?.jobId
                                                ?.deadline
                                        )}
                                        {/* {formatDate(jobApplicationDetails?.jobId?.deadline)} */}
                                    </p>
                                </div>
                            )}

                        {jobApplicationDetails &&
                            jobApplicationDetails?.jobId?.employmentType && (
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Employment type
                                    </h2>
                                    <p>
                                        {
                                            jobApplicationDetails?.jobId
                                                ?.employmentType
                                        }
                                    </p>
                                </div>
                            )}

                        {jobApplicationDetails &&
                            jobApplicationDetails?.jobId?.availablePosition && (
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Available position
                                    </h2>
                                    <p>
                                        {
                                            jobApplicationDetails?.jobId
                                                ?.availablePosition
                                        }
                                    </p>
                                </div>
                            )}

                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">
                                Salary Range
                            </h2>
                            <p>
                                {jobApplicationDetails
                                    ? formatCurrency(
                                          jobApplicationDetails?.jobId
                                              ?.salaryMin
                                      )
                                    : "Loading..."}{" "}
                                -
                                {jobApplicationDetails
                                    ? formatCurrency(
                                          jobApplicationDetails?.jobId
                                              ?.salaryMax
                                      )
                                    : "Loading..."}
                            </p>
                        </div>
                        {isRecruiterPage ? (
                            <StatusChangeForm
                                handleChangeStatus={handleChangeStatus}
                                jobApplicationDetails={jobApplicationDetails}
                            />
                        ) : (
                            <div>
                                <div className="mb-4">
                                    Applied on :
                                    <p>
                                        {jobApplicationDetails
                                            ? formatDate(
                                                  jobApplicationDetails?.createdAt
                                              )
                                            : "Loading..."}
                                    </p>
                                </div>
                                {jobApplicationDetails && (
                                    <div
                                        className={`badge ${
                                            jobApplicationDetails?.applicationStatus ==
                                            "Applied"
                                                ? "badge badge-accent  gap-2 w-24"
                                                : jobApplicationDetails?.applicationStatus ==
                                                  "Shortlisted"
                                                ? "badge badge-success gap-2 w-24"
                                                : "badge badge-error gap-2 w-24"
                                        } `}
                                    >
                                        {
                                            jobApplicationDetails?.applicationStatus
                                        }
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApplicationDetails;
