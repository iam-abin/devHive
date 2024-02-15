import React from "react";

const DropDownSelect: React.FC<{ firstItem: string; jobs: any }> = ({ firstItem, jobs }) => {
	return (
		<>
			<select className="select select-primary text-center font-semibold rounded-md py-3 max-w-sm">
				<option disabled hidden selected>
					{firstItem ? firstItem : "Select an item"}
				</option>
				{jobs.map((job: any, i: number) => (
					<option key={i} value={job.title}>
						{job.title}
					</option>
				))}
			</select>
		</>
	);
};

export default DropDownSelect;
