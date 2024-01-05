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
	const [jobs, setJobs] = useState([]);

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
			setJobs(candidates.data);
			setpageCount(candidates.totalNumberOfPages);
			// dispatch(setLoaded());
		})();
	}, [currentPage]);

	const viewProfileDetails = async (userId: string) => {
		console.log("in viewProfileDetails fn ", userId);
		navigate(`/admin/candidate/viewProfileDetails/${userId}`);
	};

	// const handleBlockUnblock = async (userId: string, isActive: boolean) => {
	// 	Swal.fire({
	// 		title: `Do you want to ${
	// 			isActive ? "block" : "unblock"
	// 		} this Candidate?`,
	// 		text: "Are you sure!",
	// 		icon: "warning",
	// 		showCancelButton: true,
	// 		confirmButtonColor: "#3085d6",
	// 		cancelButtonColor: "#d33",
	// 		confirmButtonText: "Yes, Block",
	// 	}).then(async (result) => {
	// 		if (result.isConfirmed) {
	// 			const updatedCandidate = await blockUnblockCandidateApi(userId);
	// 			if (updatedCandidate) {
	// 				notify(updatedCandidate.message, "success");
	// 			}

	// 			const candidates = candidatesData.map((candidate) => {
	// 				if (candidate.userId === userId) {
	// 					return {
	// 						...candidate,
	// 						isActive: updatedCandidate.data.isActive,
	// 					};
	// 				}

	// 				return candidate;
	// 			});

	// 			setCandidatesData(candidates);
	// 		}
	// 	});
	// };

	return (
		<div>
			<div className="text-center mx-24">
				{/* <SideNavBar /> */}
				<h1 className="font-semibold text-5xl mt-4 mb-10">
					Candidates Management
				</h1>
				{/* <TableComponent columns={columns} data={candidatesData} /> */}
				<CandidateCard
					candidate={candidatesData}
					handleViewCandidate={viewProfileDetails}
				/>
			</div>
			<Paginate
				pageCount={pageCount}
				handlePageChange={handlePageChange}
			/>
		</div>
	);
}

export default AllCandidatesPage;
