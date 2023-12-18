import EditProfile from "../../components/candidate/EditProfile"
import HeaderCandidate from "../../components/candidate/HeaderCandidate"

function CandidateProfileEditPage() {
  return (
    <div>
      <div>
      {/* <header className="bg-blue-500 p-4 text-white">
        <h1 className="text-2xl font-bold">Job Portal</h1>
      </header> */}
      <HeaderCandidate />
      <main className="h-screen flex items-center justify-center mt-80">
        <EditProfile />
      </main>
    </div>
    </div>
  )
}

export default CandidateProfileEditPage
