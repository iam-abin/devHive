import HeaderCandidate from "../../../components/candidate/HeaderCandidate"
import Profile from "../../../components/candidate/Profile"

function CandidateProfilePage() {
  return (
    <div>
      <div>
      {/* <header className="bg-blue-500 p-4 text-white">
        <h1 className="text-2xl font-bold">Job Portal</h1>
      </header> */}
      <HeaderCandidate />
      <main className="h-screen flex items-center justify-center">
        <Profile />
      </main>
    </div>
    </div>
  )
}

export default CandidateProfilePage
