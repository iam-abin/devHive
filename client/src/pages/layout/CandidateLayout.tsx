import React, {  ReactNode } from "react";
import TopNavBar from "../../components/navBar/TopNavBar";
import Footer from "../../components/footer/Footer";

const CandidateLayout: React.FC<{ children: ReactNode }> = ({ children }) => {

	return (
		<div className="dark:bg-boxdark-2 dark:text-bodydark">
			<div className="flex h-screen flex-col">
				<TopNavBar />
				<main>
					<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
						{children}
					</div>
				</main>
                <Footer />
			</div>
		</div>
	);
};

export default CandidateLayout;
