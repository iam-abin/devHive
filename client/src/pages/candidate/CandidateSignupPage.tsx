import CandidateSigninForm from "../../components/candidate/CandidateSigninForm"

import candidareLoginImg from "../../assets/candidate-login.svg"

function CandidateSignupPage() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full lg:w-7/12 flex items-center justify-center">
         <CandidateSigninForm />
      </div>
      <div className="hidden lg:flex lg:w-5/12 h-full w-full items-center justify-center bg-white">
        <div className="w-full bg-yellow-200">
           <img src={candidareLoginImg} className="h-600" alt="img unavailable" />
        </div>
      </div>
    </div>
  )
}

export default CandidateSignupPage
