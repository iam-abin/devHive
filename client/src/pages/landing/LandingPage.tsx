// import { GiHamburgerMenu } from "react-icons/gi"
import HeaderLanding from "../../components/landing/HeaderLanding";
import HomeLanding from "../../components/landing/HomeLanding";
import FooterLanding from "../../components/landing/FooterLanding";
// import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/reducer/reducer";

// import HeaderLandingPage from "../components/candidate/HeaderCandidate";
// import LandingCandidate from "../components/candidate/LandingCandidate";
// import FooterCandidate from "../components/candidate/FooterCandidate";


function LandingPage() {
	// const navigate = useNavigate();
	useEffect(()=>{
	
		// if(isRecruiterLoggedIn){
		// 	return navigate("/recruiter/home")
		// }
	},[])

	return (
		<div>
			{/* <GiHamburgerMenu /> */}
			<HeaderLanding />
			<HomeLanding />
			<FooterLanding />
		</div>
	);
}

export default LandingPage;
