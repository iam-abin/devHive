import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterJobsApi, getJobFieldsValuesApi } from "../../axios/apiMethods/jobs-service/jobs";
import { setFilteredJobs } from "../../redux/slice/job/filteredJobsSlice";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [jobFieldsValues, setJobFieldsValues] = useState({
        title: [],
        company_location: [],
        employment_type: [],
        experience: [],
    });

    useEffect(() => {
        (async () => {
            const jobFieldsValues = await getJobFieldsValuesApi(["title", "company_location", "employment_type"]);
            setJobFieldsValues(jobFieldsValues.data);
        })();
    }, []);

    const [jobCriteria, setJobCriteria] = useState({
        title: "",
        company_location: "",
        employment_type: "",
        experience: "",
    });

    console.log("?????????????????????????????????????????????????????????????????");
    console.log(jobCriteria);
    console.log("?????????????????????????????????????????????????????????????????");
    

    const handleChange = (e: any) => {
        setJobCriteria({
            ...jobCriteria,
            [e.target.name]: e.target.value,
        });
    };

    const handleJobFilter = async () => {
        if (jobCriteria.title === "" && jobCriteria.company_location === "" && jobCriteria.employment_type === "") {
            return;
        }

        const filteredJobs = await filterJobsApi(jobCriteria);
        dispatch(setFilteredJobs({data: filteredJobs.data}));
    };

    return (
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10 px-4 md:px-10">
            <select
                onChange={handleChange}
                name="title"
                value={jobCriteria.title}
                className="select select-primary text-center font-semibold rounded-md py-3 md:max-w-sm"
            >
                <option  value="" disabled hidden>
                    Job Role
                </option>
                {jobFieldsValues.title?.map((title, index) => (
                    <option className="md:max-w-sm" key={index} value={title}>
                        {title}
                    </option>
                ))}
            </select>

            <select
                onChange={handleChange}
                name="company_location"
                value={jobCriteria.company_location}
                className="select select-primary text-center font-semibold rounded-md py-3 md:max-w-sm"
            >
                <option value="" disabled hidden>
                    Location
                </option>
                {jobFieldsValues.company_location?.map((company_location, index) => (
                    <option key={index} value={company_location}>
                        {company_location}
                    </option>
                ))}
            </select>

            <select
                onChange={handleChange}
                name="employment_type"
                value={jobCriteria.employment_type}
                className="select select-primary text-center font-semibold rounded-md py-3 md:max-w-sm"
            >
                <option value="" disabled hidden>
                    Job Type
                </option>
                {jobFieldsValues.employment_type?.map((employment_type, index) => (
                    <option key={index} value={employment_type}>
                        {employment_type}
                    </option>
                ))}
            </select>

            <button
                onClick={handleJobFilter}
                className="btn btn-primary rounded-md w-full md:w-auto font-bold py-3 text-black md:ml-4"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
