import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidateCard from "../../components/cards/CandidateCard";
import { getAllCandidatesProfilesApi } from "../../axios/apiMethods/profile-service/recruiter";
import Paginate from "../../components/pagination/Paginate";
import CandidateCardShimmer from "../../components/shimmer/recruiter/CandidateCardShimmer";
import { IUserData } from "../../types/user";


const LIMIT: number = 2
function ViewAllCandidatesPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setpageCount] = useState(1);
    const [searchKey, setSearchKey] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [candidatesData, setCandidatesData] = useState<IUserData[]>(
        []
    );

    const handlePageChange = async ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const candidates = await getAllCandidatesProfilesApi(
                    currentPage,
                    LIMIT
                );

                setCandidatesData(candidates.data.candidates);
                setpageCount(candidates.data.totalNumberOfPages);
            } finally {
                setLoading(false);
            }

            // dispatch(setLoaded());
        })();
    }, [currentPage]);

    const filteredCandidates = candidatesData.filter((candidate: IUserData) =>
        candidate.name.toLowerCase().includes(searchKey.toLowerCase())
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
                                onChange={(e) => setSearchKey(e.target.value)}
                                className="input input-bordered w-24 md:w-auto"
                            />
                        </div>
                    </div>
                </div>

                {loading ? (
                    Array.from({length: LIMIT}).map((_, index)=>  <CandidateCardShimmer key={index} />)
                ) : filteredCandidates.length <= 0 ? (
                    <div>No Candidates are registered yet</div>
                ) : (
                    filteredCandidates.map((candidate) => (
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
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </>
    );
}

export default ViewAllCandidatesPage;
