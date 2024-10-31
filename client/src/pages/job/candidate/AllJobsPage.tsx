// src/pages/AllJobsPage.tsx
import { useEffect, useState } from "react";
import { getAllJobsApi, serachJobsApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { useNavigate } from "react-router-dom";
import Paginate from "../../../components/pagination/Paginate";
import JobCard from "../../../components/cards/JobCard";
import SearchBar from "../../../components/filterSearch/SearchBar";
import { IResponse } from "../../../types/api";
import { IJob } from "../../../types/Job";

function AllJobsPage() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [jobs, setJobs] = useState([]);
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
            let allJobs: IResponse | null = null;
            if (!searchKey) {
                allJobs = await getAllJobsApi(currentPage);
            } else {
                allJobs = await serachJobsApi({ searchKey }, currentPage, 2);
            }

            if (allJobs) {
                setJobs(allJobs.data.jobs);
                setNumberOfPages(allJobs.data.numberOfPages);
            }
        })();
    }, [currentPage, searchKey]);

    return (
        <div className="container mx-auto my-8">
            <div className="mb-4 flex justify-end">
                <SearchBar onSearch={setSearchKey} />
            </div>
            {jobs.length > 0 ? (
                <>
                    <div>
                        {jobs.map((job: Partial<IJob>) => (
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
                    <h1 className="font-bold text-3xl">No jobs are listed yet</h1>
                </div>
            )}
        </div>
    );
}

export default AllJobsPage;
