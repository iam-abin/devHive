import { useEffect, useState } from "react";
import {
    getAllJobsApi,
    searchJobsCandidateApi,
} from "../../../axios/apiMethods/jobs-service/jobs";
import { useNavigate } from "react-router-dom";
import Paginate from "../../../components/pagination/Paginate";
import JobCard from "../../../components/cards/JobCard";
import SearchBar from "../../../components/filterSearch/SearchBar";
import { IResponse } from "../../../types/api";
import { IJob } from "../../../types/Job";
import { SEARCH_RESOURCE_TYPES } from "../../../utils/constants";
import JobCardShimmer from "../../../components/shimmer/JobCardShimmer";

const LIMIT: number = 2;

function AllJobsPage() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState("");

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    };

    const handleView = (jobId: string) => {
        navigate(`/candidate/job-details/${jobId}`);
    };

    // Reset to page 1 when starting a new search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchKey]);

    useEffect(() => {
        (async () => {
            try {
                let allJobs: IResponse | null = null;
                setLoading(true);
                if (!searchKey) {
                    allJobs = await getAllJobsApi(currentPage);
                } else {
                    allJobs = await searchJobsCandidateApi(
                        searchKey,
                        SEARCH_RESOURCE_TYPES.JOBS,
                        currentPage,
                        LIMIT
                    );
                }

                if (allJobs) {
                    setJobs(allJobs.data.jobs);
                    setNumberOfPages(allJobs.data.numberOfPages);
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [currentPage, searchKey]);

    return (
        <div className="container mx-auto my-8 px-4 md:px-0">
            {" "}
            {/* Added padding for consistency */}
            <div className="mb-4 flex justify-end mr-4 sm:mr-20 md:mr-40">
                {" "}
                {/* Adjusted margin */}
                <SearchBar
                    placeholder={"search with title"}
                    onSearch={setSearchKey}
                />
            </div>
            {jobs.length > 0 ? (
                <>
                    <div>
                        {loading
                            ? Array.from({ length: LIMIT }).map((_, index) => (
                                  <JobCardShimmer key={index} />
                              ))
                            : jobs.map((job: Partial<IJob>) => (
                                  <JobCard
                                      job={job}
                                      key={job.id}
                                      handleViewJob={handleView}
                                  />
                              ))}
                    </div>
                    {numberOfPages > 1 && (
                        <Paginate
                            pageCount={numberOfPages}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </>
            ) : (
                <div className="flex justify-center items-center h-[39.7vh]">
                    <h1 className="font-bold text-3xl">
                        No jobs are listed yet
                    </h1>
                </div>
            )}
        </div>
    );
}

export default AllJobsPage;
