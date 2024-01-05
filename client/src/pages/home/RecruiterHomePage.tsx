import TopNavBarRecruiter from "../../components/navBar/TopNavBarRecruiter";
import FooterLanding from "../../components/footer/FooterLanding";

import dashboard from "../../assets/dashboard.svg";
import finance from "../../assets/finance.svg";
import companies from "../../assets/companies.svg";
import candidates from "../../assets/candidates.svg";
import membership from "../../assets/membership.svg";
import LeftNavBarRecruiter from "../../components/navBar/LeftNavBarRecruiter";

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

function RecruiterHomePage() {
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
		console.log("in view candidate profile details candidate id is:",candidateId);
		
		// console.log("in viewProfileDetails fn ", candidateId);
		navigate(`/recruiter/viewCandidateProfileDetails/${candidateId}`);
	};

	const menus = [
		{ title: "Dashboard", src: dashboard, to: "/recruiter" },
		{ title: "Jobs", src: finance, to: "/recruiter/all-jobs" },
		{
			title: "Added Jobs",
			src: finance,
			to: "/recruiter/recruiter-added-jobs",
		},
		{
			title: "Applications",
			src: companies,
			to: "/recruiter/applications",
		},
		{ title: "Chats", src: candidates, to: "/recruiter/chats" },
		{ title: "Profile", src: membership, to: "/recruiter/profile" },
	];
	console.log("candidatesData in recruiter home page is", candidatesData);

	return (
		<>
			<TopNavBarRecruiter />
			<div className="flex">
				<LeftNavBarRecruiter menus={menus} />
				<div className="p-7 text-2xl flex-1 font-semibold bg-slate-400 h-screen">
					<h1>Home page</h1>
					{/*  */}
					<div>
						<div className="text-center mx-24">
							{/* <SideNavBar /> */}
							{/* <TableComponent columns={columns} data={candidatesData} /> */}
							{candidatesData.length <= 0 ? (
								<div>No Candidates are registered yet</div>
							) : (
								candidatesData.map((candidate) => (
									<CandidateCard key={candidate.id}
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
					{/*  */}
				</div>
			</div>
			<FooterLanding />
		</>
	);
}

export default RecruiterHomePage;
