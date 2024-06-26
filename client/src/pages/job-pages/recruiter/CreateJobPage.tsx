import { createJobApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer/reducer";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../utils/toastMessage";
import { JobFormData } from "../../../types/JobCreationFormData";
import CreateJobForm from "../../../components/form/CreateJobForm";
import { useEffect, useState } from "react";
import { recruiterGetProfileApi } from "../../../axios/apiMethods/profile-service/recruiter";

const initialJobValues: JobFormData = {
	title: "",
	recruiterId: "",
	// companyId: "",
	job_descriptions: "",
	skills_required: [],
	available_position: 0,
	experience_required: "",
	education_required: "",
	// location: "",
	employment_type: "full-time",
	salary_min: 0,
	salary_max: 0,
	deadline: "",
	company_name: "",
	company_location: "",
};

function CreateJobPage() {
	const recruiterData: any = useSelector(
		(state: RootState) => state.recruiterData.data
	);

	const [recruiterProfileData, setecruiterProfileData] = useState<any>({});

	useEffect(() => {
		(async () => {
			const recruiterProfile = await recruiterGetProfileApi(
				recruiterData.id
			);
			console.log("recruiterProfile ", recruiterProfile);
			
			setecruiterProfileData(recruiterProfile.data);
			initialJobValues.company_name = recruiterProfile.data.company_name;
			initialJobValues.company_location = recruiterProfile.data.company_location;
		})();
	}, []);

	const navigate = useNavigate();

	const handleSubmit = async (jobData: JobFormData) => {
		try {
			console.log("create job page handle submit ",jobData);
			
			
			if (!recruiterProfileData?.company_name) {
				notify(
					"Please provide company details in your profile before creating a job!!!",
					"warning"
				);
				return;
			}
			const response = await createJobApi(jobData);
			notify(response.message, "success");
			navigate("/recruiter/recruiter-added-jobs");
		} catch (error: any) {
			
			notify(error.response.data.errors[0].message, "warning");
		}
	};

	return (
		<>
			<div className="flex items-center justify-center h-full bg-fuchsia-50">
				<CreateJobForm
					initialJobValues={initialJobValues}
					handleSubmit={handleSubmit}
					recruiterData={recruiterProfileData}
				/>
			</div>
		</>
	);
}

export default CreateJobPage;
