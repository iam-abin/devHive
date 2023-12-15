import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewJobDetailsApi } from "../../api/axios/admin/job";

function ViewJobDetails() {
  const { jobId } = useParams();
  interface JobInterface {
    id: string;
    jobId: string;
    title: string;
    recruiter: string;
    company: string;
    job_descriptions?: string;
    skills_required?: string | string[];
    available_position?: string;
    experience_required?: string;
    education_required?: string;
    location?: string;
    employment_type?: string;
    salary_min?: number;
    salary_max?: number;
    has_applied?: boolean;
    blocked?: boolean;
    deadline?: Date;
  }
  
  const [userProfileDetails, setUserProfileDetails] = useState<JobInterface | null>(null);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        console.log("fetching job details");
        
        const job = await viewJobDetailsApi(jobId);
        console.log("all jobs are : ",job);
        console.log("all jobs are : ",job.data);

        setUserProfileDetails(job.data.data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfileDetails();
  }, [jobId]);

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">View Details Page</h2>

        {userProfileDetails ? (
          <div>
            <p className="mb-2">
              <span className="font-semibold">Title:</span> {userProfileDetails?.title}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Recruiter:</span> {userProfileDetails?.recruiter}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Company:</span> {userProfileDetails?.company}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Active Status:</span>{" "}
              {userProfileDetails?.blocked ? "Active" : "Inactive"}
            </p>
            <p>
              <span className="font-semibold">Job ID:</span> {userProfileDetails?.jobId}
            </p>
          </div>
        ) : (
          <div className="text-red-500">No Job data found</div>
        )}
      </div>
    </div>
  );
}

export default ViewJobDetails;
