import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCandidateAppliedJobsApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { RootState } from "../../../redux/reducer";
import { useSelector } from "react-redux";
import JobAppliedCard from "../../../components/cards/JobAppliedCard";
import Paginate from "../../../components/pagination/Paginate";
import { IJob } from "../../../types/Job";


function AppliedJobsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setpageCount] = useState(1);
    const [appliedJobsData, setAppliedJobsData] = useState<IJob[]>([]);

    const navigate = useNavigate();

    const candidateData = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const handlePageChange = async ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    };

    useEffect(() => {
        (async () => {
            // dispatch(setLoading());
            if(candidateData){
                const response = await getAllCandidateAppliedJobsApi(
                    candidateData.id,
                    currentPage
                );
    
                setAppliedJobsData(response.data.appliedJobs);
                setpageCount(response.data.numberOfPages);
            }
        })();
    }, [currentPage, candidateData]);

    const viewApplicationDetails = async (jobId: string) => {
        navigate(`/candidate/application-details/${jobId}`);
    };

    return (
        <>
            {appliedJobsData.length > 0 ? (
                <div className="flex flex-col gap-12">
                    <div className="flex items-center justify-center mt-5">
                        <h1 className="text-3xl font-bold">My Applied Jobs</h1>
                    </div>
                    <div className="justify-center">
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
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-[55.7vh]">
                    <h1 className="font-bold text-3xl">
                        No jobs are Applied Yet yet
                    </h1>
                </div>
            )}
        </>
    );
}

export default AppliedJobsPage;
