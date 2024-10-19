import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { RootState } from "../../../redux/reducer/reducer";
import {
    recruiterGetProfileApi,
    updateRecruiterProfileApi,
} from "../../../axios/apiMethods/profile-service/recruiter";
import { notify } from "../../../utils/toastMessage";

interface ProfileFormData {
    name: string;
    email: string;
    phone: number;
    isVerified: boolean;
    isActive: boolean;
    gender?: string;
    company_id?: string;
    profileImage?: string;
    about?: string;
    userId: string;
    companyName: string;
    companyWebsite: string;
    companyLocation: string;
    companyState: string;
    companyCountry: string;
}

function RecruiterProfileEditPage() {
    const [profileDetails, setProfileDetails] = useState<any>(null);
    const navigate = useNavigate();
    const recruiterData: any = useSelector(
        (state: RootState) => state.recruiterData.data
    );
    const { id } = recruiterData;

    useEffect(() => {
        const fetchProfileDetails = async () => {
            const profile = await recruiterGetProfileApi(id);
            setProfileDetails(profile.data);
        };

        fetchProfileDetails();
    }, [id]);

    if (!profileDetails) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (profileData: ProfileFormData) => {
            const data = await updateRecruiterProfileApi(profileData);

            if (data.data) {
                notify("Profile updated successfully", "success");
                navigate("/recruiter/profile");
            } else {
                notify("Profile not updated", "error");
            }
    };

    const initialProfileValues: ProfileFormData = {
        name: profileDetails?.name ?? undefined,
        email: profileDetails?.email ?? undefined,
        phone: profileDetails?.phone ?? 0,
        isVerified: profileDetails?.isVerified ?? false,
        isActive: profileDetails?.isActive ?? false,
        gender: profileDetails?.gender ?? undefined,
        company_id: profileDetails?.company_id ?? undefined,
        profileImage: profileDetails?.profileImage ?? undefined,
        about: profileDetails?.about ?? undefined,
        userId: profileDetails?.id ?? undefined,
        companyName: profileDetails?.companyName ?? undefined,
        companyWebsite: profileDetails?.companyWebsite ?? undefined,
        companyLocation: profileDetails?.companyLocation ?? undefined,
        companyState: profileDetails?.companyState ?? undefined,
        companyCountry: profileDetails?.companyCountry ?? undefined,
    };

    return (
        <div>
            <main className="h-full flex items-center justify-center">
                <Formik
                    initialValues={initialProfileValues}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {(formik) => {
                        const { errors, touched } = formik;
                        return (
                            <div className="md:w-6/12 p-6">
                                <div className="mb-5">
                                    <h1 className="text-center sm:text-5xl font-bold">
                                        Edit Profile
                                    </h1>
                                    <div className="w-16 h-1 bg-black mx-auto my-4"></div>
                                </div>

                                <Form noValidate className="bg-slate-300 p-6">
                                    {/* Name field */}
                                    <div className="form-control w-6/6">
                                        <label htmlFor="name" className="label">
                                            Name
                                        </label>
                                        <Field
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={`input input-primary w-full rounded-xl ${
                                                errors.name && touched.name
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component="div"
                                            className="error label-text-alt"
                                        />
                                    </div>

                                    {/* Email field */}
                                    <div className="form-control w-6/6">
                                        <label
                                            htmlFor="email"
                                            className="label"
                                        >
                                            Email
                                        </label>
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={`input input-primary w-full rounded-xl ${
                                                errors.email && touched.email
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="error label-text-alt"
                                        />
                                    </div>

                                    {/* Phone field */}
                                    <div className="form-control w-6/6">
                                        <label
                                            htmlFor="phone"
                                            className="label"
                                        >
                                            Phone
                                        </label>
                                        <Field
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className={`input input-primary w-full rounded-xl ${
                                                errors.phone && touched.phone
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="phone"
                                            component="div"
                                            className="error label-text-alt"
                                        />
                                    </div>

                                    {/* Gender field */}
                                    <div className="form-control w-6/6">
                                        <label
                                            htmlFor="gender"
                                            className="label"
                                        >
                                            Gender
                                        </label>
                                        <Field
                                            type="text"
                                            id="gender"
                                            name="gender"
                                            className={`input input-primary w-full rounded-xl ${
                                                errors.gender && touched.gender
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="gender"
                                            component="div"
                                            className="error label-text-alt"
                                        />
                                    </div>

                                    {/* About field */}
                                    <div className="form-control w-6/6">
                                        <label
                                            htmlFor="about"
                                            className="label"
                                        >
                                            About
                                        </label>
                                        <Field
                                            as="textarea"
                                            id="about"
                                            name="about"
                                            className={`input input-primary w-full rounded-xl ${
                                                errors.about && touched.about
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="about"
                                            component="div"
                                            className="error label-text-alt"
                                        />
                                    </div>
                                    <div className="h-1 w-full bg-black my-5"></div>
                                    {/* ======================== */}
                                    {/* Company Name field */}
                                    <div className="form-control w-6/6">
                                        <label
                                            htmlFor="companyName"
                                            className="label"
                                        >
                                            Company Name
                                        </label>
                                        <Field
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            className={`input input-primary w-full rounded-xl ${
                                                errors.companyName &&
                                                touched.companyName
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="companyName"
                                            component="div"
                                            className="error label-text-alt"
                                        />
                                    </div>

                                    {/* Website field */}
                                    <div className="form-control w-6/6">
                                        <label
                                            htmlFor="companyWebsite"
                                            className="label"
                                        >
                                            Company Website
                                        </label>
                                        <Field
                                            type="text"
                                            id="companyWebsite"
                                            name="companyWebsite"
                                            className={`input input-primary w-full rounded-xl ${
                                                errors.companyWebsite &&
                                                touched.companyWebsite
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="companyWebsite"
                                            component="div"
                                            className="error label-text-alt"
                                        />
                                    </div>

                                    {/* Company Location field */}
                                    <div className="form-control w-6/6">
                                        <label
                                            htmlFor="companyLocation"
                                            className="label"
                                        >
                                            Company Location
                                        </label>
                                        <Field
                                            type="text"
                                            id="companyLocation"
                                            name="companyLocation"
                                            className={`input input-primary w-full rounded-xl ${
                                                errors.companyLocation &&
                                                touched.companyLocation
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="companyLocation"
                                            component="div"
                                            className="error label-text-alt"
                                        />
                                    </div>

                                    {/* Company State field */}
                                    <div className="form-control w-6/6">
                                        <label
                                            htmlFor="companyState"
                                            className="label"
                                        >
                                            Company State
                                        </label>
                                        <Field
                                            type="text"
                                            id="companyState"
                                            name="companyState"
                                            className={`input input-primary w-full rounded-xl ${
                                                errors.companyState &&
                                                touched.companyState
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="companyState"
                                            component="div"
                                            className="error label-text-alt"
                                        />
                                    </div>

                                    {/* Company Country field */}
                                    <div className="form-control w-6/6">
                                        <label
                                            htmlFor="companyCountry"
                                            className="label"
                                        >
                                            Company Country
                                        </label>
                                        <Field
                                            type="text"
                                            id="companyCountry"
                                            name="companyCountry"
                                            className={`input input-primary w-full rounded-xl ${
                                                errors.companyCountry &&
                                                touched.companyCountry
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        <ErrorMessage
                                            name="companyCountry"
                                            component="div"
                                            className="error label-text-alt"
                                        />
                                    </div>
                                    {/* ======================== */}

                                    <div className="flex items-center justify-center mt-3 mb-3">
                                        <button
                                            type="submit"
                                            className="btn w-60 btn-primary"
                                        >
                                            Update Profile
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        );
                    }}
                </Formik>
            </main>
        </div>
    );
}

export default RecruiterProfileEditPage;
