import React from 'react'
import AllJob from '../../../components/candidate/AllJob'
import HeaderCandidate from '../../../components/navBar/NavBarCandidate'
import FooterCandidate from '../../../components/candidate/FooterCandidate'

function AllJobsPage() {
  return (
    <div>
      <HeaderCandidate />
      <AllJob />
      <FooterCandidate />
    </div>
  )
}

export default AllJobsPage
