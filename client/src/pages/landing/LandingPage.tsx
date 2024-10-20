import homeImage from "../../assets/landingPage/company-like.jpg";
import { useEffect } from "react";
import NavBarLanding from "../../components/navBar/NavBarLanding";
import SearchBar from "../../components/searchBar/SearchBar";
import JobCard from "../../components/cards/JobCard";
import { getAllJobsApi } from "../../axios/apiMethods/jobs-service/jobs";

import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";
import { useLocation, useNavigate } from "react-router-dom";
import Paginate from "../../components/pagination/Paginate";
import TopNavBarRecruiter from "../../components/navBar/TopNavBarRecruiter";
import {
    clearCurrentPage,
    clearFilteredJobs,
    clearTotalNumberOfPages,
    setFilteredJobs,
} from "../../redux/slice/job/filteredJobsSlice";
import { setTotalNumberOfPages } from "../../redux/slice/job/filteredJobsSlice";
import { setCurrentPage } from "../../redux/slice/job/filteredJobsSlice";
import TopNavBarCandidate from "../../components/navBar/TopNavBarCandidate";
import Footer from "../../components/footer/Footer";
import { candidateGetProfileApi } from "../../axios/apiMethods/profile-service/candidate";
import { setCandidateProfileDetails } from "../../redux/slice/candidateSlice/candidateProfileSlice";

function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const isRecruiterUrl = location.pathname.includes("recruiter");
    const isCandidateUrl = location.pathname.includes("candidate");

    const candidate: any = useSelector(
        (state: RootState) => state.candidateData.data
    );
    const recruiter = useSelector(
        (state: RootState) => state.recruiterData.data
    );

    const pageCount: any = useSelector(
        (state: RootState) => state.filteredJobs.totalNumberOfPages
    );

    const currentPage: any = useSelector(
        (state: RootState) => state.filteredJobs.currentPage
    );

    const jobs: any = useSelector((store: RootState) => {
        console.log(store.filteredJobs.data);

        return store.filteredJobs.data;
    });

    const handleGetAllJobs = async (page: number) => {
        // dispatch(setLoading());
        const allJobs = await getAllJobsApi(page);

        // dispatch(setLoaded());
        return allJobs;
    };

    useEffect(() => {
        (async () => {
            let id = candidate?.id;
            let candidateProfile;
            if (isCandidateUrl && candidate) {
                candidateProfile = await candidateGetProfileApi(id);
                dispatch(setCandidateProfileDetails(candidateProfile?.data));
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const allJobs = await handleGetAllJobs(currentPage);
            // Check if allJobs.data exists before accessing its properties
            if (allJobs && allJobs.data) {
                dispatch(setFilteredJobs(allJobs.data.jobs));

                dispatch(
                    setTotalNumberOfPages({
                        totalNumberOfPages: allJobs.data.totalNumberOfPages,
                    })
                );
            }
            return () => {
                // This cleanup function will be called when the component is unmounted
                dispatch(clearFilteredJobs());
                dispatch(clearTotalNumberOfPages());
                dispatch(clearCurrentPage());
            };
        })();
    }, [currentPage]);

    const handlePageChange = async ({ selected }: { selected: number }) => {
        dispatch(setCurrentPage({ currentPage: selected + 1 }));
    };

    const handleViewJob = async (jobId: string) => {
        console.log(isRecruiterUrl);

        if (isRecruiterUrl) {
            if(!recruiter){
                return navigate(`/candidate/signin`);
            }
            return navigate(`/recruiter/job-details/${jobId}`);
        }

        if(isCandidateUrl){
            if(!candidate){
                return  navigate(`/candidate/signin`);
            }
            navigate(`/candidate/job-details/${jobId}`);
        }

    };

    return (
        <>
            {/* <GiHamburgerMenu /> */}

            {candidate && isCandidateUrl ? (
                <TopNavBarCandidate />
            ) : recruiter && isRecruiterUrl ? (
                <TopNavBarRecruiter toggleLeftNavBar={undefined} />
            ) : (
                <NavBarLanding />
            )}

            <div>
                <div>
                    <div
                        className="hero min-h-screen"
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
                                    {candidate && isCandidateUrl
                                        ? "Start searching"
                                        : recruiter && isRecruiterUrl
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
                        <SearchBar />
                    </div>
                    <div>
                        {jobs.toString()}
                        {jobs && jobs.length > 0 ? (
                            jobs.map(
                                (job: any) =>
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
                    {jobs?.length > 0 && (
                        <Paginate
                            pageCount={pageCount}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

export default LandingPage;
