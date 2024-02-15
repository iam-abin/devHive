import { useEffect, useState } from "react";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const StatusChangeForm: React.FC<{
	handleChangeStatus: (status: string) => void;
	jobApplicationDetails?: any; // Add the prop for jobApplicationDetails
}> = ({ handleChangeStatus, jobApplicationDetails }) => {
  
	const [defaultStatus, setDefaultStatus] = useState("Reject");

	useEffect(() => {
		// Update default status whenever jobApplicationDetails changes
		if (jobApplicationDetails && jobApplicationDetails.jobId) {
			// You can extract the status from the backend response
			const backendStatus =
				jobApplicationDetails.jobId.jobApplicationStatus;
			setDefaultStatus(backendStatus || "Reject"); // Use the backend status or fallback to 'Reject'
		}
	}, [jobApplicationDetails]);

	const initialValues = {
		status: defaultStatus, // Use defaultStatus as the initial value
	};

	const statusChangeSchema = yup.object().shape({
		status: yup.string().required("Status is required"),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={statusChangeSchema}
			onSubmit={(values) => {
				console.log(values);

				if (!values) {
					console.error("Form values are undefined.");
					return;
				}

				handleChangeStatus(values.status);
			}}
		>
			{(formik) => (
				<Form noValidate className="w-80 flex items-center">
					<div className="mb-4">
						<label
							htmlFor="status"
							className="block text-sm font-medium text-gray-600"
						>
							Status
						</label>
						<Field
							as="select"
							id="status"
							name="status"
							className={`mt-1 p-2 w-full border rounded-md ${
								formik.errors.status && formik.touched.status
									? "border-red-500"
									: ""
							}`}
						>
							<option value="Rejected">Rejected</option>
							<option value="Shortlisted">Shortlisted</option>
						</Field>
						<ErrorMessage
							name="status"
							component="p"
							className="text-red-500 text-xs mt-1"
						/>
					</div>

					<div className="mb-6">
						<button
							type="submit"
							className="w-full bg-blue-500 text-white  p-2 rounded-md hover:bg-blue-600"
						>
							Change Status
						</button>
					</div>

					{formik.errors.status && formik.touched.status && (
						<p className="text-red-500 text-xs mt-1">
							{formik.errors.status}
						</p>
					)}
				</Form>
			)}
		</Formik>
	);
};

export default StatusChangeForm;
