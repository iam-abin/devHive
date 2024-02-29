import React, { useState, ReactNode } from "react";
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

				{/* <!-- ===== Sidebar End ===== --> */}

				{/* <!-- ===== Content Area Start ===== --> */}
				{/* <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"> */}
				{/* <!-- ===== Header Start ===== --> */}
				{/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
				{/* <!-- ===== Header End ===== --> */}

				{/* <!-- ===== Main Content Start ===== --> */}
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
