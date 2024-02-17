import { Outlet } from "react-router-dom";

import dashboard from "../../assets/dashboard.svg";
import finance from "../../assets/finance.svg";
import companies from "../../assets/companies.svg";
import candidates from "../../assets/candidates.svg";
import membership from "../../assets/membership.svg";
import TopNavBarRecruiter from "../../components/navBar/TopNavBarRecruiter";
import LeftNavBarRecruiter from "../../components/navBar/LeftNavBarRecruiter";

const RecruiterLayout = () => {
	const menus = [
		{ title: "Dashboard", src: dashboard, to: "/recruiter" },
		{
			title: "Candidates",
			src: dashboard,
			to: "/recruiter/all-candidates",
		},
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

	return (
		<>
			{/*top-nav-bar */}
			<TopNavBarRecruiter />

			<div className="flex">
				{/*left-nav-bar */}
				<div className="sticky top-0 h-screen overflow-y-auto">
					<LeftNavBarRecruiter menus={menus} />
				</div>

				{/* right-side */}
				<div className="flex-1 overflow-y-auto bg-slate-400 h-screen">
					{<Outlet />}
				</div>
			</div>
		</>
	);
};

export default RecruiterLayout;