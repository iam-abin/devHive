import homeImage from "../../assets/landingPage/company-like.jpg";
import { useEffect, useState } from "react";
import NavBarLanding from "../../components/navBar/NavBarLanding";
import SearchBar from "../../components/filterBar/FilterBar";
import JobCard from "../../components/cards/JobCard";
import { filterJobsApi, getAllJobsApi, getJobFieldsValuesApi } from "../../axios/apiMethods/jobs-service/jobs";

import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { useLocation, useNavigate } from "react-router-dom";
import Paginate from "../../components/pagination/Paginate";
import TopNavBar from "../../components/navBar/TopNavBar";
import Footer from "../../components/footer/Footer";
import { getCandidateProfileApi } from "../../axios/apiMethods/profile-service/candidate";
import { setMyProfileData } from "../../redux/slice/user";
import {
    clearCurrentPage,
    clearJobs,
    clearTotalNumberOfPages,
    setCurrentPage,
    setJobs,
    setTotalNumberOfPages,
} from "../../redux/slice/job";
import { recruiterGetProfileApi } from "../../axios/apiMethods/profile-service/recruiter";
import { IResponse } from "../../types/api";
import { setLoaded, setLoading } from "../../redux/slice/isLoading";
import { checkUserRole } from "../../utils/checkRole";
import { IJob } from "../../types/Job";
import { IUserData } from "../../types/user";
import { hotToastMessage } from "../../utils/hotToastMessage";

function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const isRecruiterUrl: boolean = location.pathname.includes("recruiter");
    const isCandidateUrl: boolean = location.pathname.includes("candidate");

    const currentUser: IUserData | null = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const { isCandidate, isRecruiter } = checkUserRole(currentUser!);

    const pageCount: number = useSelector(
        (store: RootState) => store.jobReducer.totalNumberOfPages
    );

    const currentPage: number = useSelector(
        (store: RootState) => store.jobReducer.currentPage
    );


    const jobs: IJob[] = useSelector((store: RootState) => {
        return store.jobReducer.jobs;
    });

    const [jobFieldsValues, setJobFieldsValues] = useState({
        title: [],
        companyLocation: [],
        employmentType: [],
    });

    const [jobCriteria, setJobCriteria] = useState({
        title: "",
        companyLocation: "",
        employmentType: "",
    });

    const [isFiltering, setIsFiltering] = useState(false);
    const [filteredCurrentPage, setFilteredCurrentPage] = useState(1);

    useEffect(() => {
        (async () => {
            const jobFieldsValues = await getJobFieldsValuesApi(["title", "companyLocation", "employmentType"]);
            setJobFieldsValues(jobFieldsValues.data);
        })();
    }, []);

    const handleJobFilter = async () => {
        if (jobCriteria.title === "" && jobCriteria.companyLocation === "" && jobCriteria.employmentType === "") {
            hotToastMessage("Please choose options", "warn");
            return;
        }

        const filteredJobs = await filterJobsApi(jobCriteria, filteredCurrentPage, 2);

        if (filteredJobs && filteredJobs.data) {
            dispatch(setCurrentPage(1));
            dispatch(setJobs(filteredJobs.data.jobs));
            dispatch(setTotalNumberOfPages(filteredJobs.data.numberOfPages));
            setIsFiltering(true)
        }else{
            dispatch(clearCurrentPage());
        }
    };

    const handleReset = async () => {
        dispatch(clearCurrentPage());
        setFilteredCurrentPage(1);
        const allJobs = await getAllJobsApi(1);
        if (allJobs && allJobs.data) {
            dispatch(setJobs(allJobs.data.jobs));
            setIsFiltering(false)
            setJobCriteria({
                title: "",
                companyLocation: "",
                employmentType: "",
            })
            dispatch(setTotalNumberOfPages(allJobs.data.totalNumberOfPages));
        }
    };

    const handleGetAllJobs = async (page: number) => {
        dispatch(setLoading());
        
        const allJobs = isFiltering?await handleJobFilter():await getAllJobsApi(page);

        dispatch(setLoaded());
        return allJobs;
    };

    useEffect(() => {
        (async () => {
            const userId = currentUser?.id;
            if (userId) {
                let currentUserProfile: IResponse | null = null;
                if (isCandidateUrl && isCandidate) {
                    currentUserProfile = await getCandidateProfileApi(userId);
                    dispatch(setMyProfileData(currentUserProfile?.data));
                } else if (isRecruiterUrl && isRecruiter) {
                    currentUserProfile = await recruiterGetProfileApi(userId);
                }
                dispatch(setMyProfileData(currentUserProfile?.data));
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const allJobs = await handleGetAllJobs(isFiltering ? filteredCurrentPage : currentPage);
            // Check if allJobs.data exists before accessing its properties
            if (allJobs && allJobs.data) {
                dispatch(setJobs(allJobs.data.jobs));

                dispatch(
                    setTotalNumberOfPages(allJobs.data.totalNumberOfPages)
                );
            }
            return () => {
                // This cleanup function will be called when the component is unmounted
                dispatch(clearJobs());
                setIsFiltering(false)
                setJobCriteria({
                    title: "",
                    companyLocation: "",
                    employmentType: "",
                })
                dispatch(clearTotalNumberOfPages());
                dispatch(clearCurrentPage());
            };
        })();
    }, [currentPage, dispatch, isFiltering, filteredCurrentPage]);

    const handlePageChange = async ({ selected }: { selected: number }) => {
        if (isFiltering) {
            setFilteredCurrentPage(selected + 1);
        } else {
            dispatch(setCurrentPage(selected + 1));
        }
    };

    const handleViewJob = async (jobId: string): Promise<void> => {
        if (currentUser && isRecruiter) {
            return navigate(`/recruiter/job-details/${jobId}`);
        }

        if (currentUser && isCandidate) {
            return navigate(`/candidate/job-details/${jobId}`);
        }

        navigate(`/candidate/signin`);
    };

    return (
        <>
            {isCandidate && isCandidateUrl ? (
                <></>
            ) : isRecruiter && isRecruiterUrl ? (
                <TopNavBar />
            ) : (
                <NavBarLanding />
            )}

            <div>
                <div>
                    <div
                        className="hero mt-0 min-h-screen"
                        style={{
                            backgroundImage: `url(${homeImage})`,
                        }}
                    >
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">
                                    Find your dream jobs now
                                </h1>
                                <p className="mb-5">
                                    It's time to get creative in your job
                                    search!
                                </p>
                                <Link
                                    to="search-div"
                                    smooth={true}
                                    duration={700} // Adjust the duration as needed
                                    offset={-60} // Adjust this value based on the height of your navigation bar
                                    className="btn btn-primary"
                                >
                                    {isCandidate && isCandidateUrl
                                        ? "Start searching"
                                        : isRecruiter && isRecruiterUrl
                                        ? "Start searching"
                                        : "Get Started"}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="search-div"
                    className=" bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900"
                >
                    <div className="py-5">
                    <SearchBar 
                        jobFieldsValues={jobFieldsValues}
                        jobCriteria={jobCriteria}
                        setJobCriteria={setJobCriteria}
                        handleJobFilter={handleJobFilter}
                        handleReset={handleReset}
                    />
                    </div>
                    <div>
                        {jobs && jobs.length > 0 ? (
                            jobs.map(
                                (job: Partial<IJob>) =>
                                    job.isActive && (
                                        <JobCard
                                            key={job?.id}
                                            job={job}
                                            handleViewJob={handleViewJob}
                                        />
                                    )
                            )
                        ) : (
                            <div className="mx-40 p-6 bg-transparent rounded-md shadow-md">
                                <div className="flex items-center justify-center mb-4">
                                    <p className="text-white ml-4 text-2xl font-bold">
                                        No jobs are listed yet
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    {pageCount > 1 && (
                        <Paginate
                            pageCount={pageCount}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
            <div>{!currentUser && <Footer />}</div>
        </>
    );
}

export default LandingPage;
