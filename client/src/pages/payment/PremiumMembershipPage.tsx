import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import { useEffect, useState } from "react";
import TableComponent from "../../components/table/TableComponent";

import { notify } from "../../utils/toastMessage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
	createMembershipPlanApi,
	getAllMembershipPlansApi,
} from "../../axios/apiMethods/premium-plans-service/admin";

interface RecruiterInterface {
	id: string;
	name: string;
	email: string;
	phone: string;
	isActive: boolean;
	userId: string;
}

function PremiumMembershipPage() {

	const [membershipPlansData, setMembershipPlansData] = useState<
		RecruiterInterface[]
	>([]);

	useEffect(() => {
		(async () => {
			try {
				const recruiters = await getAllMembershipPlansApi();
				
				setMembershipPlansData(recruiters.data);
			} catch (error: any) {
				notify(error.response.data.errors[0].message, "error");
				console.error(error);
			}
		})();
	}, []);

	const columns = [
		{
			name: "Name",
			selector: (row: { name: string }) => row.name,
			sortable: true,
		},
		{
			name: "Price",
			selector: (row: { price: number }) => row.price,
			sortable: true,
		}
	];

	const [modalIsOpen, setModalIsOpen] = useState(false);

	// Handle modal open/close
	const handleModalOpen = () => setModalIsOpen(true);
	const handleModalClose = () => setModalIsOpen(false);

	// Handle creating premium membership plan
	const handleCreatePremium = async (values: any) => {
		let arr: Array<string> = [];
		
		values.features = values.features.split(",").map((element: string) => {
			arr.push(element.trim());
			return element;
		});
		const membershipPlans = await createMembershipPlanApi(values);
		if (membershipPlans) {
			notify(membershipPlans.message, "success");
		}
		setMembershipPlansData([...membershipPlansData, membershipPlans.data]);
		
		// Add logic to create premium membership plan
		// You can use state management (e.g., Redux) or send an API request to the server
		// to create the plan and update the list
		handleModalClose();
	};

	// Formik initialValues
	const initialValues = {
		name: "",
		price: 0,
		description: "",
		features: "",
	};

	// Formik validation schema using Yup
	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		price: Yup.string().required("Price is required"),
		description: Yup.string().required("Description is required"),
		features: Yup.string().required("Features are required"),
	});

	return (
		<div className="text-center mx-10">
			{/* <SideNavBar /> */}
			<div className="font-semibold text-5xl mt-4 mb-10">
				Premium Membership Plans
			</div>
			<div className="w-full flex flex-row mb-3 justify-end">
				<button
					onClick={handleModalOpen}
					className="bg-blue-500 text-white p-2 rounded"
				>
					Create Premium
				</button>
			</div>
			{/* ReactModal */}

			<Modal open={modalIsOpen} onClose={handleModalClose} center>
				<div className="p-6 bg-white rounded-lg shadow-md">
					<h2 className="text-2xl font-semibold mb-4">
						Create Premium Membership
					</h2>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(values) => {
							handleCreatePremium(values);
						}}
					>
						<Form>
							{/* Form fields */}
							<div className="mb-4">
								<label htmlFor="name">Name:</label>
								<Field
									type="text"
									id="name"
									name="name"
									className="p-2 border border-gray-300 w-full rounded"
								/>
								<ErrorMessage
									name="name"
									component="div"
									className="text-red-500"
								/>
							</div>

							<div className="mb-4">
								<label htmlFor="price">Price:</label>
								<Field
									type="text"
									id="price"
									name="price"
									className="p-2 border border-gray-300 w-full rounded"
								/>
								<ErrorMessage
									name="price"
									component="div"
									className="text-red-500"
								/>
							</div>

							<div className="mb-4">
								<label htmlFor="description">
									Description:
								</label>
								<Field
									as="textarea"
									id="description"
									name="description"
									className="p-2 border border-gray-300 w-full rounded"
								/>
								<ErrorMessage
									name="description"
									component="div"
									className="text-red-500"
								/>
							</div>

							<div className="mb-4">
								<label htmlFor="features">Features:</label>
								<Field
									as="textarea"
									id="features"
									name="features"
									className="p-2 border border-gray-300 w-full rounded"
								/>
								<ErrorMessage
									name="features"
									component="div"
									className="text-red-500"
								/>
							</div>

							{/* Buttons */}
							<div className="flex justify-end">
								<button
									type="submit"
									className="bg-green-500 text-white p-2 rounded mr-2"
								>
									Create
								</button>
								<button
									type="button"
									onClick={handleModalClose}
									className="bg-red-500 text-white p-2 rounded"
								>
									Cancel
								</button>
							</div>
						</Form>
					</Formik>
				</div>
			</Modal>
			<TableComponent columns={columns} data={membershipPlansData} />
		</div>
	);
}

export default PremiumMembershipPage;
