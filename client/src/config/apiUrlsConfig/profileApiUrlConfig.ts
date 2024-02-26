const CANDIDATE_PROFILE_URL = `profile/candidate`;
const RECRUITER_PROFILE_URL = `profile/recruiter`;

const profileApiUrlConfig = {
	// Candidate
	getCandidateProfileUrl: (userId: string) =>
		`${CANDIDATE_PROFILE_URL}/viewProfile/${userId}`,
	updateCandidateProfileUrl: `${CANDIDATE_PROFILE_URL}/updateProfile`,
	uploadCandidateImageUrl: `${CANDIDATE_PROFILE_URL}/uploadProfilePic`,
	uploadCandidateResumeUrl: `${CANDIDATE_PROFILE_URL}/uploadResume`,
	deleteResumeUrl: (userId: string) =>
		`${CANDIDATE_PROFILE_URL}/delete-resume/${userId}`,
	updateCandidateSkillsUrl: `${CANDIDATE_PROFILE_URL}/updateSkills`,

	// Recruiter
	getgetRecruiterProfileUrl: (userId: string) =>
		`${RECRUITER_PROFILE_URL}/viewProfile/${userId}`,
	getRecruiterProfileUrl: (userId: string) =>
		`${CANDIDATE_PROFILE_URL}/viewRecruiterProfile/${userId}`,
	updategetRecruiterProfileUrl: `${RECRUITER_PROFILE_URL}/updateProfile`,
	getAllCandidatesProfilesUrl: (page: number) =>
		`${RECRUITER_PROFILE_URL}/viewAllCandidatesProfiles/${page}`,
	getACandidateProfileUrl: (userId: string) =>
		`${RECRUITER_PROFILE_URL}/viewCandidateProfile/${userId}`,
};

export default profileApiUrlConfig;
