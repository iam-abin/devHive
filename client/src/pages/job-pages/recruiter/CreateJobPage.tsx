import TopNavBarRecruiter from "../../../components/navBar/TopNavBarRecruiter";

import { createJobApi } from "../../../axios/apiMethods/jobs-service/jobs";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducer/reducer";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../utils/toastMessage";
import { JobFormData } from "../../../types/JobCreationFormData";
import CreateJobForm from "../../../components/recruiter/CreateJobForm";

const initialJobValues: JobFormData = {
	title: "",
	recruiterId: "",
	// companyId: "",
	job_descriptions: "",
	skills_required: [],
	available_position: 0,
	experience_required: "",
	education_required: "",
	location: "",
	employment_type: "full-time",
	salary_min: 0,
	salary_max: 0,
	deadline: "",
};

function CreateJobPage() {
	const recruiterData: any = useSelector(
		(state: RootState) => state.recruiterData.data
	);

	const navigate = useNavigate();

	const handleSubmit = async (jobData: JobFormData) => {
		try {
			const response = await createJobApi(jobData);
			notify(response.message, "success");
			navigate("/recruiter/all-jobs");
		} catch (error: any) {
			notify(error.response.data.errors[0].message, "error");
		}
	};

	return (
		<>
			<TopNavBarRecruiter />
			<div className="flex items-center justify-center h-full bg-fuchsia-50">
				<CreateJobForm
					initialJobValues={initialJobValues}
					handleSubmit={handleSubmit}
					recruiterData={recruiterData}
				/>
			</div>
		</>
	);
}

export default CreateJobPage;
