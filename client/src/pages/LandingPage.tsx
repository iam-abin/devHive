import { GiHamburgerMenu } from "react-icons/gi"

import HeaderLandingPage from "../components/candidate/HeaderLandingPage";
import LandingCandidate from "../components/candidate/LandingCandidate";
import FooterCandidate from "../components/candidate/FooterCandidate";


function LandingPage() {
	return (
		<div>
			<GiHamburgerMenu />
			<HeaderLandingPage />
			<LandingCandidate />
			<FooterCandidate />
		</div>
	);
}

export default LandingPage;
