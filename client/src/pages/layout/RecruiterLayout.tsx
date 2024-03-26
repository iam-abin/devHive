import { Outlet } from "react-router-dom";
import { useState } from "react"; // Import useState hook

import dashboard from "../../assets/dashboard.svg";
import finance from "../../assets/finance.svg";
import companies from "../../assets/companies.svg";
import candidates from "../../assets/candidates.svg";
import membership from "../../assets/membership.svg";
import TopNavBarRecruiter from "../../components/navBar/TopNavBarRecruiter";
import LeftNavBarRecruiter from "../../components/navBar/LeftNavBarRecruiter";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";

const RecruiterLayout = () => {
	const recruiterProfile: any = useSelector(
		(state: RootState) => state.recruiterData.data
	);

	// State to manage visibility of left navbar on mobile
	const [isLeftNavBarVisible, setIsLeftNavBarVisible] =
		useState<boolean>(false);

	const toggleLeftNavBar = () => {
		console.log("togglechangeFn ", isLeftNavBarVisible);

		setIsLeftNavBarVisible(!isLeftNavBarVisible);
	};

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
			<TopNavBarRecruiter toggleLeftNavBar={toggleLeftNavBar} />

			{/*left-nav-bar sm screens*/}
			<div
				className={`absolute md:hidden overflow-y-auto ${
					!isLeftNavBarVisible ? "hidden " : "block z-30"
				}`} // Hide on small screens, show on medium and larger screens
			>
				{isLeftNavBarVisible && <LeftNavBarRecruiter menus={menus} />}
			</div>

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
