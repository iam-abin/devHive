import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewCandidateProfileDetailsApi } from "../../../axios/apiMethods/admin-service/candidates";
import CandidateProfile from "../../../components/admin/profile/CandidateProfile";
import { setLoaded, setLoading } from "../../../redux/slice/isLoading";


const ViewCandidateProfilePage: React.FC = () => {
	const dispatch = useDispatch();
	const { userId } = useParams();

    const loadingStatus = useSelector(
		(state: any) => state.loading.isLoading
	);
	
	const [candidateProfileData, setCandidateProfileData] = useState();

	useEffect(() => {
		
		const fetchProfileDetails = async () => {
			try {
                dispatch(setLoading())
				const candidate = await viewCandidateProfileDetailsApi(userId!);
				setCandidateProfileData(candidate.data);

			} finally{
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
	
	return <CandidateProfile data={candidateProfileData} />;
};

export default ViewCandidateProfilePage;
