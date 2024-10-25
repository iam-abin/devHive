import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCandidateAppliedJobsApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { RootState } from "../../../redux/reducer";
import { useSelector } from "react-redux";
import JobAppliedCard from "../../../components/cards/JobAppliedCard";
import TopNavBarCandidate from "../../../components/navBar/TopNavBar";
import Paginate from "../../../components/pagination/Paginate";
import Footer from "../../../components/footer/Footer";

interface JobInterface {
    id: string;
    title: string;
    recruiter: string;
    company: string;
    jobDescription?: string;
    skills?: string | string[];
    availablePosition?: string;
    experienceRequired?: string;
    educationRequired?: string;
    location?: string;
    employmentType?: string;
    salaryMin?: number;
    salaryMax?: number;
    has_applied?: boolean;
    isActive?: boolean;
    deadline?: Date;
}

function AppliedJobsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setpageCount] = useState(1);

    const navigate = useNavigate();
    const [appliedJobsData, setAppliedJobsData] = useState<JobInterface[]>([]);

    const candidateData: any = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const handlePageChange = async ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    };

    useEffect(() => {
        (async () => {
            // dispatch(setLoading());
            const response = await getAllCandidateAppliedJobsApi(
                candidateData?.id,
                currentPage
            );

            setAppliedJobsData(response.data.appliedJobs);
            setpageCount(response.data.totalNumberOfPages);
            // dispatch(setLoaded());
        })();
    }, [currentPage]);

    const viewApplicationDetails = async (jobId: string) => {
        // dispatch(setRecruiterId(id))
        navigate(`/candidate/application-details/${jobId}`);
    };

    return (
        <div>
            <TopNavBarCandidate />
            {/* <div className="pb-20"> */}
            {appliedJobsData.length > 0 ? (
                <>
                    <div className="flex flex-col gap-12">
                        <div className="flex items-center justify-center mt-5">
                            <h1 className="text-3xl font-bold">
                                My Applied Jobs
                            </h1>
                        </div>
                        <div className="justify-center h-[70vh]">
                            {appliedJobsData.map((job: any) => (
                                <JobAppliedCard
                                    key={job?.id}
                                    job={job}
                                    handleViewJob={viewApplicationDetails}
                                />
                            ))}
                        </div>

                        <div>
                            {pageCount > 1 && (
                                <Paginate
                                    pageCount={pageCount}
                                    handlePageChange={handlePageChange}
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center h-[55.7vh]">
                    <h1 className="font-bold text-3xl">
                        No jobs are Applied Yet yet
                    </h1>
                </div>
            )}
            {/* </div> */}
            <Footer />
        </div>
    );
}

export default AppliedJobsPage;
