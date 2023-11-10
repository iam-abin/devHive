import imageLogin from "../../assets/recruiter-login.svg";
import RecruiterSigninForm from "../../components/recruiter/RecruiterSigninForm";

function RecruiterSigninPage() {
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
			<RecruiterSigninForm />
		</main>
  )
}

export default RecruiterSigninPage
