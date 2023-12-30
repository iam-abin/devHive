import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { viewCandidateProfileDetailsApi } from "../../../axios/apiMethods/admin-service/candidates";
// import { getUserProfile } from "../../../redux/reducers/thunks/userThunks";

function ViewCandidateProfileDetails() {
	const dispatch = useDispatch()
	const { userId } = useParams();
    const loadingStatus = useSelector((state: any) => state.userProfile?.loadingStatus);
    const userProfileDetails = useSelector((state: any) => state.userProfile?.data);
    const error = useSelector((state: any) => state.userProfile?.error);

    // useEffect(() => {
    //     dispatch(getUserProfile(userId));
    //   }, []);

      useEffect(() => {
        // dispatch(viewCandidateProfileDetailsApi(userId));
        // return () => {
        //   dispatch(clearEmployerJobDetails());
        //   dispatch(clearEmployerJobId());
        // };

        const fetchProfileDetails = async () => {
            		try {
            			const candidate = await viewCandidateProfileDetailsApi(userId);
            			console.log(candidate);
        
            			// fetchProfileDetails(candidate.data.data); //  it was an error-------=-=-==-=-=-=-==-=-=-=-- undo fast
            		} catch (error) {
            			console.error("Error fetching profile details:", error);
            		}
            	};
        
            	fetchProfileDetails();
      }, [dispatch, userId]);

      if(loadingStatus){
        return (
          <div className='h-screen w-screen flex justify-center items-center'>
            <div className="text-4xl font-bold">Loading......</div>
          </div>
        )
      }

      if(error){
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className="text-4xl font-bold">Somthing Went wrong</div>
          </div>
      }


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

	return (
		<div className="container mx-auto mt-8">
			<div className="bg-white p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold mb-4">
					Details of {userProfileDetails?.name}
				</h2>

				{userProfileDetails ? (
					<div>
						<p className="mb-2">
							<span className="font-semibold">Name:</span>{" "}
							{userProfileDetails?.name}
						</p>
						<p className="mb-2">
							<span className="font-semibold">Email:</span>{" "}
							{userProfileDetails?.email}
						</p>
						<p className="mb-2">
							<span className="font-semibold">Phone:</span>{" "}
							{userProfileDetails?.phone}
						</p>
						<p className="mb-2">
							<span className="font-semibold">About:</span>{" "}
							{userProfileDetails?.about}
						</p>
						<p className="mb-2">
							<span className="font-semibold">
								Active Status:
							</span>{" "}
							{userProfileDetails?.isActive
								? "Active"
								: "Inactive"}
						</p>
						{/* Add other fields */}
						{userProfileDetails?.gender && (
							<p className="mb-2">
								<span className="font-semibold">Gender:</span>{" "}
								{userProfileDetails.gender}
							</p>
						)}
						{userProfileDetails?.currentLocation && (
							<p className="mb-2">
								<span className="font-semibold">
									Current Location:
								</span>{" "}
								{userProfileDetails.currentLocation}
							</p>
						)}
						{userProfileDetails?.address && (
							<p className="mb-2">
								<span className="font-semibold">Address:</span>{" "}
								{userProfileDetails.address}
							</p>
						)}
						{/* Add other fields as needed */}
					</div>
				) : (
					<div className="text-red-500">No candidate data found</div>
				)}
			</div>
		</div>
	);
}

export default ViewCandidateProfileDetails;
