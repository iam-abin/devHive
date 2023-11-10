import { Route, Routes } from "react-router-dom"

import AdminHomePage from "../pages/admin/AdminHomePage"
import AdminSigninPage from "../pages/admin/AdminSigninPage"
import CandidateManagementPage from "../pages/admin/CandidateManagementPage"
import RecruiterManagementPage from "../pages/admin/RecruiterManagementPage"

function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
        <Route path="/signin" element={<AdminSigninPage />} />
        <Route path="/candidates" element={<CandidateManagementPage />} />
        <Route path="/recruiters" element={<RecruiterManagementPage />} />
      </Routes>
    </>
  )
}

export default AdminRoutes
