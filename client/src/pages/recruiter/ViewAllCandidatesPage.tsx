import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidateCard from "../../components/cards/CandidateCard";
import { getAllCandidatesProfilesApi } from "../../axios/apiMethods/profile-service/recruiter";
import Paginate from "../../components/pagination/Paginate";
interface CandidateInterface {
    id: string;
    name: string;
    email: string;
    phone: string;
    isActive: boolean;
    userId: string;
}

function ViewAllCandidatesPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setpageCount] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
    const [candidatesData, setCandidatesData] = useState<CandidateInterface[]>(
        []
    );

    const handlePageChange = async ({ selected }: { selected: number }) => {
        console.log(selected);

        setCurrentPage(selected + 1);
    };

    useEffect(() => {
        (async () => {
            // dispatch(setLoading());
            const candidates = await getAllCandidatesProfilesApi(currentPage);
            console.log(candidates);

            setCandidatesData(candidates.data.candidates);
            setpageCount(candidates.data.totalNumberOfPages);
            console.log("pageCount", pageCount);

            // dispatch(setLoaded());
        })();
    }, [currentPage]);

    const filteredCandidated = candidatesData.filter((candidate: any) =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const viewProfileDetails = async (candidateId: string) => {
        navigate(`/recruiter/viewCandidateProfileDetails/${candidateId}`);
    };

    return (
        <>
            <div className="text-center mt-5">
                <div className="navbar flex justify-end">
                    <div className="flex-none gap-2 mb-5">
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Search"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input input-bordered w-24 md:w-auto"
                            />
                        </div>
                    </div>
                </div>

                {filteredCandidated.length <= 0 ? (
                    <div>No Candidates are registered yet</div>
                ) : (
                    filteredCandidated.map((candidate) => (
                        <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                            handleViewCandidate={viewProfileDetails}
                        />
                    ))
                )}
            </div>
            <Paginate
                pageCount={pageCount}
                handlePageChange={handlePageChange}
            />
        </>
    );
}

export default ViewAllCandidatesPage;
