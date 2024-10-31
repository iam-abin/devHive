import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import { useEffect, useState } from "react";

import { notify } from "../../utils/toastMessage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
    createMembershipPlanApi,
    getAllMembershipPlansApi,
} from "../../axios/apiMethods/premium-plans-service/admin";
import Table from "../../components/table/Table";
import SearchBar from "../../components/filterSearch/SearchBar";
import { IResponse } from "../../types/api";
import { SEARCH_RESOURCE_TYPES } from "../../utils/constants";
import { searchApi } from "../../axios/apiMethods/admin-service/search";

// Formik validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.string().required("Price is required"),
    description: Yup.string().required("Description is required"),
    features: Yup.string().required("Features are required"),
});

// Formik initialValues
const initialValues = {
    name: "",
    price: 0,
    description: "",
    features: "",
};

function MembershipsListPage() {
    const [membershipPlansData, setMembershipPlansData] = useState<any>([]);
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKey, setSearchKey] = useState("");

    const PLANS_PER_PAGE: number = 2;

    const columns = [
        { Header: "Name", accessor: "name" },
        { Header: "Price", accessor: "price" },
    ];

    const fetchMembershipPlans = async (currentPage: number) => {
        let membershipPlans: IResponse | [] = [];
        if (!searchKey) {
            membershipPlans = await getAllMembershipPlansApi(
                currentPage,
                PLANS_PER_PAGE
            );

            setMembershipPlansData(membershipPlans.data.membershipPlans);
        } else {
            membershipPlans = await searchApi(
                searchKey,
                SEARCH_RESOURCE_TYPES.PLANS,
                currentPage,
                PLANS_PER_PAGE
            );
            setMembershipPlansData(membershipPlans.data.result);
        }
        setNumberOfPages(membershipPlans.data.numberOfPages);
    };

    // Reset to page 1 when starting a new search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchKey]);

    useEffect(() => {
        fetchMembershipPlans(1); // Fetch initial data for the first page
    }, [searchKey, currentPage]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle modal open/close
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    // Handle creating premium membership plan
    const handleCreatePremium = async (values: any) => {
        const arr: Array<string> = [];

        values.features = values.features.split(",").map((element: string) => {
            arr.push(element.trim());
            return element;
        });
        const membershipPlans = await createMembershipPlanApi(values);
        if (membershipPlans) {
            notify(membershipPlans.message, "success");
        }
        setMembershipPlansData([...membershipPlansData, membershipPlans.data]);
        handleModalClose();
    };

    return (
        <div className="mx-10">
            <div className="text-center font-semibold text-5xl mt-4 mb-10">
                Premium Membership Plans
            </div>
            <ModalComponent
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleCreatePremium={handleCreatePremium}
                handleModalClose={handleModalClose}
                isModalOpen={isModalOpen}
            />
            <div className="flex flex-row justify-between mb-3">
                <button
                    onClick={handleModalOpen}
                    className="bg-blue-500 text-white p-2 rounded w-3/12"
                >
                    Create Premium <b>  + </b>
                </button>

                <SearchBar
                    placeholder={"search by name"}
                    onSearch={setSearchKey}
                />
            </div>
            <Table
                columns={columns}
                data={membershipPlansData}
                numberOfPages={numberOfPages}
                fetchData={fetchMembershipPlans}
            />
        </div>
    );
}

interface IModal {
    initialValues: typeof initialValues;
    validationSchema: typeof validationSchema;
    handleCreatePremium: (values: typeof initialValues) => void;
    handleModalClose: () => void;
    isModalOpen: boolean;
}
const ModalComponent = ({
    initialValues,
    validationSchema,
    handleCreatePremium,
    handleModalClose,
    isModalOpen,
}: IModal) => {
    return (
        <Modal open={isModalOpen} onClose={handleModalClose} center>
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
                            <label htmlFor="description">Description:</label>
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
    );
};

export default MembershipsListPage;
