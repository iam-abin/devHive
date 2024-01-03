// import { GiHamburgerMenu } from "react-icons/gi";
import HomeCandidate from "../../components/candidate/HomeCandidate";
import FooterCandidate from "../../components/candidate/FooterCandidate";
import NavBarCandidate from "../../components/navBar/NavBarCandidate";

function CandidateHomePage() {
	return (
		<div>
			{/* <GiHamburgerMenu /> */}
			<NavBarCandidate />
			<HomeCandidate />
      <FooterCandidate />
		</div>
	);
}

export default CandidateHomePage;
