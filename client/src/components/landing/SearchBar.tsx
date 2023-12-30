import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";
import { setFilteredJobs } from "../../redux/slice/job/filteredJobsSlice";

interface SearchBarProps {
	data: any[];
}
const SearchBar: React.FC<SearchBarProps> = ({ jobs }) => {
	const dispatch = useDispatch();

	const filteredJobs = useSelector(
		(state: RootState) => state.filteredJobs.data
	);

	const [jobCriteria, setJobCriteria] = useState({
		title: "",
		locaion: "",
		type: "",
		experience: "",
	});
	useEffect(() => {
		const jobsData: SearchBarProps = { data: jobs };
		dispatch(setFilteredJobs(jobs));
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setJobCriteria((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const search = async () => {
		const filteredJobs = await filterJobs(jobCriteria);
		setFilteredJobs(filteredJobs);
	};

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
				{filteredJobs?.map((job: any) => (
					<option key={job.id} value={job.title}>
						{job.title}
					</option>
				))}
			</select>

			<select
				onChange={handleChange}
				name="locaion"
				// default value or title value of the select box is selecting based on the value in 'jobCriteria'
				value={jobCriteria.locaion}
				className="select select-primary text-center font-semibold rounded-md py-3 max-w-sm"
			>
				<option value="" disabled hidden>
					Location
				</option>
				<option value="Banglore">Banglore</option>
			</select>

			<select
				onChange={handleChange}
				name="type"
				// default value or title value of the select box is selecting based on the value in 'jobCriteria'
				value={jobCriteria.type}
				className="select select-primary text-center font-semibold rounded-md py-3 max-w-sm"
			>
				<option value="" disabled hidden>
					Job Type
				</option>
				<option value="Part Time">Part Time</option>
				<option value="Full Time">Full Time</option>
			</select>

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
			</select>

			<button className="btn btn-primary rounded-md w-64 font-bold py-3 text-black">
				Search
			</button>
		</div>
	);
};

export default SearchBar;
