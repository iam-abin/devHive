import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCandidateAppliedJobsApi, searchJobsCandidateApi } from "../../../axios/apiMethods/jobs-service/jobs";
import JobAppliedCard from "../../../components/cards/JobAppliedCard";
import Paginate from "../../../components/pagination/Paginate";
import { IJob } from "../../../types/Job";
import JobCardShimmer from "../../../components/shimmer/JobCardShimmer";
import { IResponse } from "../../../types/api";
// import SearchBar from "../../../components/filterSearch/SearchBar";
import { SEARCH_RESOURCE_TYPES } from "../../../utils/constants";

const LIMIT: number = 2;

function AppliedJobsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setpageCount] = useState(1);
    const [appliedJobsData, setAppliedJobsData] = useState<IJob[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState("");

    const navigate = useNavigate();
    
    const handlePageChange = async ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    };

    // Reset to page 1 when starting a new search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchKey]);

    useEffect(() => {
        (async () => {
            let appliedJobs: IResponse | null = null;
            setLoading(true);

            try {
                if (!searchKey) {
                    appliedJobs = await getAllCandidateAppliedJobsApi(
                        currentPage,
                        LIMIT
                    );
                    setAppliedJobsData(appliedJobs.data.appliedJobs);
                } else {
                    appliedJobs = await searchJobsCandidateApi(
                        searchKey,
                        SEARCH_RESOURCE_TYPES.APPLIED_JOBS,
                        currentPage,
                        LIMIT
                    );
                    setAppliedJobsData(appliedJobs.data.jobs);
                }
                setpageCount(appliedJobs.data.numberOfPages);
            } finally {
                setLoading(false);
            }
        })();
    }, [currentPage, searchKey]);

    const viewApplicationDetails = async (jobId: string) => {
        navigate(`/candidate/application-details/${jobId}`);
    };

    return (
        <div className="container mx-auto my-8 px-4 md:px-0">
            <div className="flex items-center justify-center mt-5">
                <h1 className="text-3xl font-bold">My Applied Jobs</h1>
            </div>{" "}
            {/* Added padding for consistency */}
            <div className="mt-5 mb-3 flex justify-end mr-4 sm:mr-20 md:mr-40">
                {" "}
                {/* Adjusted margin */}
                {/* <SearchBar
                    placeholder={"search with title"}
                    onSearch={setSearchKey}
                /> */}
            </div>
            {appliedJobsData.length > 0 ? (
                <div className="flex flex-col gap-12">
                    <div className="justify-center">
                        {loading
                            ? Array.from({ length: LIMIT }).map((_, index) => (
                                  <JobCardShimmer key={index} />
                              ))
                            : appliedJobsData.map((job: any) => (
                                  <JobAppliedCard
                                      key={job?.id}
                                      job={job}
                                      handleViewJob={viewApplicationDetails}
                                  />
                              ))}
                    </div>

                    {pageCount > 1 && (
                        <Paginate
                            pageCount={pageCount}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center h-[55.7vh]">
                    <h1 className="font-bold text-3xl">
                        No jobs are Applied Yet yet
                    </h1>
                </div>
            )}
        </div>
    );
}

export default AppliedJobsPage;
