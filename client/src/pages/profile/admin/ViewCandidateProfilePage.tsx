import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewCandidateProfileDetailsApi } from "../../../axios/apiMethods/admin-service/candidates";
import CandidateProfile from "../../../components/admin/profile/CandidateProfile";
import { setLoaded, setLoading } from "../../../redux/slice/loaderSlice/isLoading";
// import { getUserProfile } from "../../../redux/reducers/thunks/userThunks";

const ViewCandidateProfilePage: React.FC = () => {
	const dispatch = useDispatch();
	const { userId } = useParams();
	// const loadingStatus = useSelector(
	// 	(state: any) => state.userProfile?.loadingStatus
	// );

    const loadingStatus = useSelector(
		(state: any) => state.loading.isLoading
	);
  
	// const userProfileDetails = useSelector(
	// 	(state: any) => state.userProfile?.data
	// );
	// const error = useSelector((state: any) => state.userProfile?.error);

	const [candidateProfileData, setCandidateProfileData] = useState();

	useEffect(() => {
		// dispatch(viewCandidateProfileDetailsApi(userId));
		// return () => {
		//   dispatch(clearEmployerJobDetails());
		//   dispatch(clearEmployerJobId());
		// };

		const fetchProfileDetails = async () => {
			try {
                dispatch(setLoading())
				const candidate = await viewCandidateProfileDetailsApi(userId);
				console.log("candidate profile data",candidate);
				console.log("candidateprofile data.data", candidate);
				setCandidateProfileData(candidate.data);

			} catch (error) {
				console.error("Error fetching profile details:", error);
			}finally{
                dispatch(setLoaded())
            }
		};

		fetchProfileDetails();

	}, [dispatch, userId]);

	if (loadingStatus) {
		return (
			<div className="h-screen w-screen flex justify-center items-center">
				<div className="text-4xl font-bold">Loading......</div>
			</div>
		);
	}

	// if (error) {
	// 	<div className="h-screen w-screen flex justify-center items-center">
	// 		<div className="text-4xl font-bold">Somthing Went wrong</div>
	// 	</div>;
	// }

	// interface UserProfileDetails {
	// 	name: string;
	// 	email: string;
	// 	phone: string;
	// 	isActive: boolean;
	// 	userId: string;
	// 	gender?: string;
	// 	currentLocation?: string;
	// 	address?: string;
	// 	keySkills?: string[];
	// 	profile_image?: string;
	// 	about?: string;
	// 	resume?: string;
	// 	experience?: string;
	// 	// Add other properties as needed
	// }

	// const [userProfileDetails, setUserProfileDetails] =
	// 	useState<UserProfileDetails | null>(null);

	// useEffect(() => {
	// 	const fetchProfileDetails = async () => {
	// 		try {
	// 			const candidate = await viewCandidateProfileDetailsApi(userId);
	// 			console.log(candidate);

	// 			setUserProfileDetails(candidate.data.data);
	// 		} catch (error) {
	// 			console.error("Error fetching profile details:", error);
	// 		}
	// 	};

	// 	fetchProfileDetails();
	// }, [userId]);

	return <CandidateProfile data={candidateProfileData} />;
};

export default ViewCandidateProfilePage;
