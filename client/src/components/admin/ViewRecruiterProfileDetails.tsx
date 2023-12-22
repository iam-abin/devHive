import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewRecruiterProfileDetailsApi } from "../../axios/api/admin/recruiters";

function ViewRecruiterProfileDetails() {
  const { userId } = useParams();
  interface UserProfileDetails {
	name: string;
	email: string;
	phone: string;
	isActive: boolean;
	userId: string;
	// Add other properties as needed
  }
  
  const [userProfileDetails, setUserProfileDetails] = useState<UserProfileDetails | null>(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const candidate = await viewRecruiterProfileDetailsApi(userId);
        console.log(candidate);

        setUserProfileDetails(candidate.data.data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfileDetails();
  }, [userId]);

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">View Details Page</h2>

        {userProfileDetails ? (
          <div>
            <p className="mb-2">
              <span className="font-semibold">Name:</span> {userProfileDetails?.name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {userProfileDetails?.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Phone:</span> {userProfileDetails?.phone}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Active Status:</span>{" "}
              {userProfileDetails?.isActive ? "Active" : "Inactive"}
            </p>
            <p>
              <span className="font-semibold">User ID:</span> {userProfileDetails?.userId}
            </p>
          </div>
        ) : (
          <div className="text-red-500">No candidate data found</div>
        )}
      </div>
    </div>
  );
}

export default ViewRecruiterProfileDetails;
