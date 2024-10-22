import homeImage from "../../assets/landingPage/company-like.jpg";
import { useEffect } from "react";
import NavBarLanding from "../../components/navBar/NavBarLanding";
import SearchBar from "../../components/searchBar/SearchBar";
import JobCard from "../../components/cards/JobCard";
import { getAllJobsApi } from "../../axios/apiMethods/jobs-service/jobs";

import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { useLocation, useNavigate } from "react-router-dom";
import Paginate from "../../components/pagination/Paginate";
import TopNavBarRecruiter from "../../components/navBar/TopNavBarRecruiter";
import TopNavBarCandidate from "../../components/navBar/TopNavBarCandidate";
import Footer from "../../components/footer/Footer";
import { candidateGetProfileApi } from "../../axios/apiMethods/profile-service/candidate";
import { setMyProfileData } from "../../redux/slice/user";
import { clearCurrentPage, clearJobs, clearTotalNumberOfPages, setCurrentPage, setJobs, setTotalNumberOfPages } from "../../redux/slice/job";

function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const isRecruiterUrl = location.pathname.includes("recruiter");
    const isCandidateUrl = location.pathname.includes("candidate");

    const candidate = useSelector(
        (store: RootState) => store.userReducer.authData
    );
    const recruiter = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const pageCount = useSelector(
        (store: RootState) => store.jobReducer.totalNumberOfPages
    );

    const currentPage = useSelector(
        (store: RootState) => store.jobReducer.currentPage
    );

    const jobs = useSelector((store: RootState) => {
        console.log(store.jobReducer.jobs);

        return store.jobReducer.jobs;
    });

    const handleGetAllJobs = async (page: number) => {
        // dispatch(setLoading());
        const allJobs = await getAllJobsApi(page);

        // dispatch(setLoaded());
        return allJobs;
    };

    useEffect(() => {
        (async () => {
            const id = candidate?.id;
            let candidateProfile;
            if (isCandidateUrl && candidate) {
                candidateProfile = await candidateGetProfileApi(id);
                dispatch(setMyProfileData(candidateProfile?.data));
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const allJobs = await handleGetAllJobs(currentPage);
            // Check if allJobs.data exists before accessing its properties
            if (allJobs && allJobs.data) {
                dispatch(setJobs(allJobs.data.jobs));

                dispatch(
                    setTotalNumberOfPages(allJobs.data.totalNumberOfPages,
                    )
                );
            }
            return () => {
                // This cleanup function will be called when the component is unmounted
                dispatch(clearJobs());
                dispatch(clearTotalNumberOfPages());
                dispatch(clearCurrentPage());
            };
        })();
    }, [currentPage]);

    const handlePageChange = async ({ selected }: { selected: number }) => {
        dispatch(setCurrentPage(selected + 1 ));
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
