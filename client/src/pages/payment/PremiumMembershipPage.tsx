import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import { useEffect, useState } from "react";
import TableComponent from "../../components/table/TableComponent";
import {
	blockUnblockRecruiterApi,
	getAllRecruitersApi,
} from "../../axios/apiMethods/admin-service/recruiters";
import { notify } from "../../utils/toastMessage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

interface RecruiterInterface {
	id: string;
	name: string;
	email: string;
	phone: string;
	isActive: boolean;
	userId: string;
}

function PremiumMembershipPage() {
	const navigate = useNavigate();
	const [recruitersData, setRecruitersData] = useState<RecruiterInterface[]>(
		[]
	);

	useEffect(() => {
		(async () => {
			try {
				const recruiters = await getAllRecruitersApi();
				console.log("in useEffect", recruiters.data);
				setRecruitersData(recruiters.data);
			} catch (error: any) {
				console.error(error);
			}
		})();
	}, []);

	const viewProfileDetails = async (userId: string) => {
		console.log("in viewProfileDetails fn ", userId);
		navigate(`/admin/recruiter/viewProfileDetails/${userId}`);
	};

	const handleBlockUnblock = async (userId: string, isActive: boolean) => {
		Swal.fire({
			title: `Do you want to ${
				isActive ? "block" : "unblock"
			} this Recruiter?`,
			text: "Are you sure!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: `Yes, ${isActive ? "block" : "unblock"}`,
		}).then(async (result) => {
			if (result.isConfirmed) {
				const updatedRecruiter = await blockUnblockRecruiterApi(userId);
				if (updatedRecruiter) {
					notify(updatedRecruiter.message, "success");
				}

				const recruiters = recruitersData.map((recruiter) => {
					if (recruiter.id === userId) {
						return {
							...recruiter,
							isActive: updatedRecruiter.data.isActive,
						};
					}

					return recruiter;
				});

				setRecruitersData(recruiters);
			}
		});
	};

	const columns = [
		{
			name: "Name",
			selector: (row: { name: string }) => row.name,
			sortable: true,
		},
		{
			name: "Price",
			selector: (row: { phone: number }) => row.phone,
			sortable: true,
		},

		{
			name: "View",
			cell: (row: { id: string }) => (
				<button
					onClick={() => {
						viewProfileDetails(row.id);
					}}
					className="btn btn-info btn-sm w-24"
				>
					view details
				</button>
			),
		},

		{
			name: "Status",
			cell: (row: { isActive: string }) => (
				<div
					className={`badge ${
						row.isActive
							? "badge badge-success gap-2 w-20"
							: "badge badge-error gap-2 w-20"
					} `}
				>
					{row.isActive ? "active" : "inActive"}
				</div>
			),
		},
		{
			name: "Action",
			cell: (row: { id: string; isActive: boolean }) => (
				<button
					onClick={() => {
						handleBlockUnblock(row.id, row.isActive);
					}}
					className={`btn ${
						row.isActive
							? "btn-success btn-sm w-24 bg-green-600"
							: "btn btn-error btn-sm w-24 bg-red-600"
					} `}
				>
					{row.isActive ? "Block" : "unBlock"}
				</button>
			),
		},
	];

	const [modalIsOpen, setModalIsOpen] = useState(false);

	// Handle modal open/close
	const handleModalOpen = () => setModalIsOpen(true);
	const handleModalClose = () => setModalIsOpen(false);

	// Handle creating premium membership plan
	const handleCreatePremium = () => {
		// Add logic to create premium membership plan
		// You can use state management (e.g., Redux) or send an API request to the server
		// to create the plan and update the list
		handleModalClose();
	};

	// Formik initialValues
	const initialValues = {
		name: "",
		price: "",
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
							console.log(values);
							handleCreatePremium();
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
			<TableComponent columns={columns} data={recruitersData} />
		</div>
	);
}

export default PremiumMembershipPage;
