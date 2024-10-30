const CANDIDATE_PROFILE_URL = `profile/candidate`;
const RECRUITER_PROFILE_URL = `profile/recruiter`;

const profileApiUrlConfig = {
    // Candidate
    getCandidateProfileUrl: `${CANDIDATE_PROFILE_URL}`,
    updateCandidateProfileUrl: `${CANDIDATE_PROFILE_URL}`,
    updateCandidateSkillsUrl: `${CANDIDATE_PROFILE_URL}/skills`,
    updateCandidatePreferredJobsUrl: `${CANDIDATE_PROFILE_URL}/preferred-jobs`,
    uploadCandidateImageUrl: `${CANDIDATE_PROFILE_URL}/upload/image`,
    uploadCandidateResumeUrl: `${CANDIDATE_PROFILE_URL}/upload/resume`,
    deleteResumeUrl: `${CANDIDATE_PROFILE_URL}/resume`,
    getARecruiterProfileUrl: (recruiterId: string) =>`${CANDIDATE_PROFILE_URL}/recruiter/${recruiterId}`,

    // Recruiter
    getRecruiterProfileUrl: `${RECRUITER_PROFILE_URL}`,
    updategetRecruiterProfileUrl: `${RECRUITER_PROFILE_URL}`,
    getAllCandidatesProfilesUrl: (page: number) =>
        `${RECRUITER_PROFILE_URL}/candidates/${page}`,
    getACandidateProfileUrl: (candidateId: string) =>
        `${RECRUITER_PROFILE_URL}/candidate/${candidateId}`,
};

export default profileApiUrlConfig;
