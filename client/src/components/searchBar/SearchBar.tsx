import { useDispatch } from "react-redux";
import { filterJobsApi, getJobFieldsValuesApi } from "../../axios/apiMethods/jobs-service/jobs";
import { useEffect, useState } from "react";
import { setJobs } from "../../redux/slice/job";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [jobFieldsValues, setJobFieldsValues] = useState({
        title: [],
        companyLocation: [],
        employmentType: [],
        experience: [],
    });

    useEffect(() => {
        (async () => {
            const jobFieldsValues = await getJobFieldsValuesApi(["title", "companyLocation", "employmentType"]);
            setJobFieldsValues(jobFieldsValues.data);
        })();
    }, []);

    const [jobCriteria, setJobCriteria] = useState({
        title: "",
        companyLocation: "",
        employmentType: "",
        experience: "",
    });
    
    
    const handleChange = (e: any) => {
        setJobCriteria({
            ...jobCriteria,
            [e.target.name]: e.target.value,
        });
    };

    const handleJobFilter = async () => {
        if (jobCriteria.title === "" && jobCriteria.companyLocation === "" && jobCriteria.employmentType === "") {
            return;
        }

        const filteredJobs = await filterJobsApi(jobCriteria);
        dispatch(setJobs({data: filteredJobs.data}));
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
                {jobFieldsValues?.title?.map((title, index) => (
                    <option className="md:max-w-sm" key={index} value={title}>
                        {title}
                    </option>
                ))}
            </select>

            <select
                onChange={handleChange}
                name="companyLocation"
                value={jobCriteria?.companyLocation}
                className="select select-primary text-center font-semibold rounded-md py-3 md:max-w-sm"
            >
                <option value="" disabled hidden>
                    Location
                </option>
                {jobFieldsValues?.companyLocation?.map((companyLocation, index) => (
                    <option key={index} value={companyLocation}>
                        {companyLocation}
                    </option>
                ))}
            </select>

            <select
                onChange={handleChange}
                name="employmentType"
                value={jobCriteria?.employmentType}
                className="select select-primary text-center font-semibold rounded-md py-3 md:max-w-sm"
            >
                <option value="" disabled hidden>
                    Job Type
                </option>
                {jobFieldsValues?.employmentType?.map((employmentType, index) => (
                    <option key={index} value={employmentType}>
                        {employmentType}
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
