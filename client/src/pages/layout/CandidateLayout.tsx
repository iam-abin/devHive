import { Outlet } from "react-router-dom";

import TopNavBarCandidate from "../../components/navBar/TopNavBarCandidate";
import Footer from "../../components/footer/Footer";

const CandidateLayout = () => {
	const menus = [
		{ title: "Jobs", to: "/candidate/all-jobs" },

		{
			title: "Applied Jobs",
			to: "/candidate/applied-jobs",
		},
		{
			title: "Profile",
			to: "/candidate/profile",
		},
		{ title: "Chat", to: "/candidate/chat" },
		{ title: "Reset Password", to: "/candidate/passwordResetMobile" },
	];

	return (
		<div className="">
			<>
				{/*top-nav-bar */}
				<TopNavBarCandidate menus={menus} />

				{/* middle-area */}
				<div className="p-4 text-2xl overflow-auto flex-1 font-semibold bg-red-300 h-screen">
					{<Outlet />}
				</div>
				
				{/* footer */}
				<Footer />
			</>
		</div>
	);
};

export default CandidateLayout;
