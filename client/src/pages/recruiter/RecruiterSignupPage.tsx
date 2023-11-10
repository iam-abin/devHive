import imageLogin from "../../assets/recruiter-login.svg";
import RecruiterSignupForm from "../../components/recruiter/RecruiterSignupForm";

function RecruiterSignupPage() {
	return (
		<main className="w-full h-screen flex items-center  ">
			{/* left */}
			<div className="hidden lg:flex relative flex-col w-1/2 h-full  ">
				<img
					src={imageLogin}
					className="w-full h-full object-cover"
					alt=""
				/>
			</div>

			{/* right */}
			<RecruiterSignupForm />
		</main>
	);
}

export default RecruiterSignupPage;
