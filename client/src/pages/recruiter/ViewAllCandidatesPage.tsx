import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCandidatesApi } from "../../axios/apiMethods/admin-service/candidates";
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

function AllCandidatesPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageCount, setpageCount] = useState(1);

	const navigate = useNavigate();
	const [candidatesData, setCandidatesData] = useState<CandidateInterface[]>(
		[]
	);

	const handlePageChange = async ({ selected }: { selected: number }) => {
		setCurrentPage(selected + 1);
	};

	useEffect(() => {
		(async () => {
			// dispatch(setLoading());
			const candidates = await getAllCandidatesProfilesApi(currentPage);
			console.log("candidates", candidates);
			setCandidatesData(candidates.data);
			setpageCount(candidates.totalNumberOfPages);
			// dispatch(setLoaded());
		})();
	}, [currentPage]);

	const viewProfileDetails = async (candidateId: string) => {
		console.log(
			"in view candidate profile details candidate id is:",
			candidateId
		);

		// console.log("in viewProfileDetails fn ", candidateId);
		navigate(`/recruiter/viewCandidateProfileDetails/${candidateId}`);
	};

	return (
		<div>
			<div className="text-center mx-24">
				{/* <SideNavBar /> */}
				{/* <TableComponent columns={columns} data={candidatesData} /> */}
				{candidatesData.length <= 0 ? (
					<div>No Candidates are registered yet</div>
				) : (
					candidatesData.map((candidate) => (
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
		</div>
	);
}

export default AllCandidatesPage;
