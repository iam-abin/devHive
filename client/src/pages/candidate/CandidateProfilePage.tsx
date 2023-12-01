import Profile from "../../components/candidate/Profile"

function CandidateProfilePage() {
  return (
    <div>
      <h1>This is candidate profile page</h1>
      <div>
      <header className="bg-blue-500 p-4 text-white">
        <h1 className="text-2xl font-bold">Job Portal</h1>
      </header>
      <main>
        <Profile />
      </main>
    </div>
    </div>
  )
}

export default CandidateProfilePage
