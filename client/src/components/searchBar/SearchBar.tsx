import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterJobsApi, getJobFieldsValuesApi } from "../../axios/apiMethods/jobs-service/jobs";
import { setFilteredJobs } from "../../redux/slice/job/filteredJobsSlice";

interface SearchBarProps {
	// jobs: any[];
	handleGetAllJobs: any;
}
const SearchBar: React.FC<SearchBarProps> = ({ handleGetAllJobs }) => {
	const dispatch = useDispatch();
	const [jobFieldsValues, setJobFieldsValues] = useState({
		title: [],
		company_location: [],
		employment_type: [],
		experience: [],
	});

	// const filterDropdownJobs = useSelector(
	// 	(state: RootState) => state.filteredJobs.searchDropdownData
	// );

	useEffect(() => {
		(async () => {
			const jobFieldsValues = await getJobFieldsValuesApi(["title", "company_location", "employment_type"]);
			console.log("jobFieldsValues ", jobFieldsValues.data);
			
			setJobFieldsValues(jobFieldsValues.data)
		})();
	}, []);

	const [jobCriteria, setJobCriteria] = useState({
		title: "",
		location: "",
		employment_type: "",
		experience: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setJobCriteria((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));

		console.log("filter jobCriteria", jobCriteria);
	};




	const handleJobFilter = async () => {
		console.log("in handleJobFilter jobCriteria", jobCriteria);
		if (
			jobCriteria.title === "" &&
			jobCriteria.location === "" &&
			jobCriteria.employment_type === ""
		) {
			console.log("ret");
			return;
		}

		const filteredJobs = await filterJobsApi(jobCriteria);
		console.log("filteredJobs are ", filteredJobs);
		
		dispatch(setFilteredJobs({data: filteredJobs.data}));
	};
	console.log("filter jobCriteria", jobCriteria);
	return (
		<div className="flex justify-center gap-10 px-10">
			{/* <DropDownSelect firstItem={"Job Role"} jobs={undefined} /> */}

			<select
				onChange={handleChange}
				name="title"
				// default value or title value of the select box is selecting based on the value in 'jobCriteria'
				value={jobCriteria.title}
				className="select select-primary text-center font-semibold rounded-md py-3 max-w-sm"
			>
				<option value="" disabled hidden>
					Job Role
				</option>
				{jobFieldsValues?.title?.map((title: any, index: number) => (
					<option key={index} value={title}>
						{title}
					</option>
				))}
			</select>

			<select
				onChange={handleChange}
				name="company_location"
				// default value or title value of the select box is selecting based on the value in 'jobCriteria'
				value={jobCriteria.location}
				className="select select-primary text-center font-semibold rounded-md py-3 max-w-sm"
			>
				<option value="" disabled hidden>
					Location
				</option>
				{jobFieldsValues?.company_location?.map((location: any, index: number) => (
					<option key={index} value={location}>
						{location}
					</option>
				))}
			</select>

			<select
				onChange={handleChange}
				name="employment_type"
				// default value or title value of the select box is selecting based on the value in 'jobCriteria'
				value={jobCriteria.employment_type}
				className="select select-primary text-center font-semibold rounded-md py-3 max-w-sm"
			>
				<option value="" disabled hidden>
					Job Type
				</option>
				{jobFieldsValues?.employment_type?.map((employment_type: any, index: number) => (
					<option key={index} value={employment_type}>
						{employment_type}
					</option>
				))}
			</select>
			{/* 
			<select
				onChange={handleChange}
				name="experience"
				// default value or title value of the select box is selecting based on the value in 'jobCriteria'
				value={jobCriteria.experience}
				className="select select-primary text-center font-semibold rounded-md py-3 max-w-sm"
			>
				<option value="" disabled hidden>
					Experience
				</option>

				<option value="Fresher">Fresher</option>
				<option value="Junier Level">Junier Level</option>
			</select> */}

			<button
				onClick={handleJobFilter}
				className="btn btn-primary rounded-md w-64 font-bold py-3 text-black"
			>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
