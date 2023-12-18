// import { GiHamburgerMenu } from "react-icons/gi";
import HomeCandidate from "../../components/candidate/HomeCandidate";
import FooterCandidate from "../../components/candidate/FooterCandidate";
import HeaderCandidate from "../../components/candidate/HeaderCandidate";

function CandidateHomePage() {
	return (
		<div>
			{/* <GiHamburgerMenu /> */}
			<HeaderCandidate />
			<HomeCandidate />
      <FooterCandidate />
		</div>
	);
}

export default CandidateHomePage;
