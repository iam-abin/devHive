import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewRecruiterProfileDetailsApi } from "../../../axios/apiMethods/admin-service/recruiters";
import RecruiterProfile from "../../../components/admin/profile/RecruiterProfile";
import { setLoaded, setLoading } from "../../../redux/slice/loaderSlice/isLoading";
import { useDispatch } from "react-redux";

function ViewRecruiterProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch()

//   interface UserProfileDetails {
// 	name: string;
// 	email: string;
// 	phone: string;
// 	isActive: boolean;
// 	userId: string;
// 	// Add other properties as needed
//   }
  
  const [recruiterProfileData, setRecruiterProfileData] = useState();
//   const [recruiterProfileData, setRecruiterProfileData] = useState<UserProfileDetails | null>(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        dispatch(setLoading())
        const recruiter = await viewRecruiterProfileDetailsApi(userId);
        console.log("recruiter profile data",recruiter);
        console.log("candidateprofile data.data", recruiter);

        setRecruiterProfileData(recruiter.data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }finally{
        dispatch(setLoaded())
      }
    };

    fetchProfileDetails();
  }, [userId]);

  return (
    <RecruiterProfile data={recruiterProfileData} />
  );
}

export default ViewRecruiterProfilePage;
