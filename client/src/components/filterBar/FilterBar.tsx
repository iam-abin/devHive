import React from 'react';

interface FilterBarProps {
    jobFieldsValues: {
        title: string[];
        companyLocation: string[];
        employmentType: string[];
    };
    jobCriteria: {
        title: string;
        companyLocation: string;
        employmentType: string;
    };
    setJobCriteria: React.Dispatch<React.SetStateAction<{
        title: string;
        companyLocation: string;
        employmentType: string;
    }>>;
    handleJobFilter: () => void;
    handleReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
    jobFieldsValues,
    jobCriteria,
    setJobCriteria,
    handleJobFilter,
    handleReset,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setJobCriteria(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10 px-4 md:px-10">
            <select
                onChange={handleChange}
                name="title"
                value={jobCriteria.title}
                className="select select-primary text-center font-semibold rounded-md py-3 md:max-w-sm"
            >
                <option value="" disabled hidden>
                    Job Role
                </option>
                {jobFieldsValues.title.map((title, index) => (
                    <option key={index} value={title}>
                        {title}
                    </option>
                ))}
            </select>

            <select
                onChange={handleChange}
                name="companyLocation"
                value={jobCriteria.companyLocation}
                className="select select-primary text-center font-semibold rounded-md py-3 md:max-w-sm"
            >
                <option value="" disabled hidden>
                    Location
                </option>
                {jobFieldsValues.companyLocation.map((location, index) => (
                    <option key={index} value={location}>
                        {location}
                    </option>
                ))}
            </select>

            <select
                onChange={handleChange}
                name="employmentType"
                value={jobCriteria.employmentType}
                className="select select-primary text-center font-semibold rounded-md py-3 md:max-w-sm"
            >
                <option value="" disabled hidden>
                    Job Type
                </option>
                {jobFieldsValues.employmentType.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <button
                onClick={handleJobFilter}
                className="btn btn-primary rounded-md w-full md:w-auto font-bold py-3 text-black md:ml-4"
            >
                Search
            </button>

            <button
                onClick={handleReset}
                className="btn btn-secondary rounded-md w-full md:w-auto font-bold py-3 text-black md:ml-4"
            >
                Reset
            </button>
        </div>
    );
};

export default FilterBar;