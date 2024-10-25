import { Outlet } from "react-router-dom";

import dashboard from "../../assets/layoutItems/dashboard.svg";
import finance from "../../assets/layoutItems/finance.svg";
import companies from "../../assets/layoutItems/companies.svg";
import candidates from "../../assets/layoutItems/candidates.svg";
import membership from "../../assets/layoutItems/membership.svg";
import LeftNavBarRecruiter from "../../components/navBar/LeftNavBarRecruiter";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import TopNavBar from "../../components/navBar/TopNavBar";

const RecruiterLayout = () => {
	const recruiterProfile: any = useSelector(
		(store: RootState) => store.userReducer.authData
	);

	const menus = [
		{ title: "Dashboard", src: dashboard, to: "/recruiter" },
		{
			title: "Candidates",
			src: dashboard,
			to: "/recruiter/all-candidates",
		},
		// { title: "Jobs", src: finance, to: "/recruiter/all-jobs" },
		{
			title: "Added Jobs",
			src: finance,
			to: "/recruiter/recruiter-added-jobs",
		},
		{
			title: "Applicants",
			src: companies,
			to: "/recruiter/applications",
		},
		{
			title: "Chats",
			src: candidates,
			to: `/recruiter/chat/${recruiterProfile?.id!}`,
		},
		{ title: "Profile", src: membership, to: "/recruiter/profile" },
	];

	return (
		<>
			{/*top-nav-bar */}
			<TopNavBar />

			<div className="flex">
				{/* left-nav-bar for screens larger >=md */}
				<div
					className={`sticky hidden md:block top-0  overflow-y-auto `} // Hide on small screens, show on medium and larger screens
				>
					<LeftNavBarRecruiter menus={menus} />
				</div>

				{/* right-side */}
				<div className="flex-1 sm:h-screen overflow-auto bg-slate-400">
					{<Outlet />}
				</div>
			</div>
		</>
	);
};

export default RecruiterLayout;
