import { useEffect, useState } from "react";
import { getAllJobsApi, serachJobsApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { useNavigate } from "react-router-dom";
import Paginate from "../../../components/pagination/Paginate";
import JobCard from "../../../components/cards/JobCard";
import { IResponse } from "../../../types/api";
import { IJob } from "../../../types/Job";

function AllJobsPage() {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setpageCount] = useState(1);
    const [jobs, setJobs] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [debouncedSearchKey, setDebouncedSearchKey] = useState("");

    const handlePageChange = async ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    };

    const handleView = async (jobId: string): Promise<void> => {
        navigate(`/candidate/job-details/${jobId}`);
    };

    // Update debouncedSearchKey after 300ms delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchKey(searchKey);
        }, 800); // 1000ms debounce time

        // Clear the timer if searchKey changes before 800
        return () => clearTimeout(timer);
    }, [searchKey]);

    // Reset to page 1 when starting a new search
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchKey]);

    useEffect(() => {
        (async () => {
            let allJobs: IResponse | null = null;
            if (!debouncedSearchKey) {
                console.log("no search key ", debouncedSearchKey);
                allJobs = await getAllJobsApi(currentPage);
            } else {
                console.log("yes search key ", debouncedSearchKey);
                allJobs = await serachJobsApi({ searchKey: debouncedSearchKey }, currentPage, 2);
            }

            if (allJobs) {
                setJobs(allJobs.data.jobs);
                setpageCount(allJobs.data.numberOfPages);
            }
        })();
    }, [currentPage, debouncedSearchKey]);

    return (
        <div className="container mx-auto my-8">
            <div className="mb-4 flex justify-end">
                <input
                    type="text"
                    placeholder="Search"
                    className="px-4 mx-11 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => setSearchKey(e.target.value.trim())}
                />
            </div>
            {jobs.length > 0 ? (
                <>
                    <div className="">
                        {jobs.map((job: Partial<IJob>) => (
                            <JobCard
                                job={job}
                                key={job.id}
                                handleViewJob={handleView}
                            />
                        ))}
                    </div>
                    <div>
                        {pageCount > 1 && (
                            <Paginate
                                pageCount={pageCount}
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                            />
                        )}
                    </div>
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
