import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useState hook

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

  const [screenSize, setScreenSize] = useState("");
  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 768) {
        setScreenSize("small");
    } else if (width >= 768 && width < 1024) {
        setScreenSize("medium");
    } else {
        setScreenSize("large");
    }
};

useEffect(() => {
  handleResize(); // Initial screen size check
  window.addEventListener("resize", handleResize); // Listen for resize events

  // Clean up event listener
  return () => {
      window.removeEventListener("resize", handleResize);
  };
}, []);

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

	// State to manage visibility of left navbar on mobile
	const [isLeftNavBarVisible, setIsLeftNavBarVisible] =
		useState<boolean>(false);

	const toggleLeftNavBar = () => {
		console.log("togglechangeFn ", isLeftNavBarVisible);

		setIsLeftNavBarVisible(!isLeftNavBarVisible);
	};

	return (
		<>
			{/*top-nav-bar */}
			<TopNavBarRecruiter toggleLeftNavBar={toggleLeftNavBar} />

			<div className="flex">
				{/*left-nav-bar */}
				<div
					className={`md:block sticky top-0 h-screen overflow-y-auto ${
						!isLeftNavBarVisible ? "hidden md:block z-30" : "block"
					}`} // Hide on small screens, show on medium and larger screens
				>
					{isLeftNavBarVisible && (
						<LeftNavBarRecruiter menus={menus} />
					)}
				</div>

				{/* right-side */}
				<div className="flex-1 overflow-auto bg-slate-400 h-screen">
					{<Outlet />}
				</div>
			</div>
		</>
	);
};

export default RecruiterLayout;
