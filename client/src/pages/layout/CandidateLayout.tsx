import React, {  ReactNode } from "react";
import TopNavBarCandidate from "../../components/navBar/TopNavBarCandidate";
import Footer from "../../components/footer/Footer";

const CandidateLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	// const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="dark:bg-boxdark-2 dark:text-bodydark">
			{/* <!-- ===== Page Wrapper Start ===== --> */}
			<div className="flex h-screen overflow-hidden">
				{/* <!-- ===== Sidebar Start ===== --> */}

				{/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
				<TopNavBarCandidate />
				<main>
					<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
						{children}
					</div>
				</main>
				{/* <!-- ===== Main Content End ===== --> */}
				{/* </div> */}
				{/* <!-- ===== Content Area End ===== --> */}
                <Footer />
			</div>
			{/* <!-- ===== Page Wrapper End ===== --> */}
		</div>
	);
};

export default CandidateLayout;
